import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { SearchInputCriteria, AlertService, FormControlService, ViewLayoutService,
         TypeScriptTypeMetaDatatHandler, AverosDynamicDialogComponent, AverosSearchEntityComponent, 
         UseCase, SearchUseCase, UseCaseConfig, AverosDialogViewConfig, AverosViewConfig, User
        } from '@wiforge/averos';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToDoTask } from '../../../model/to-do-task';
import { ToDoTaskService } from '../../../service/to-do-task.service';
import { ToDoArea } from '../../../model/to-do-area';


@Component({
	selector: 'app-search-to-do-task-component',
	templateUrl: './search-to-do-task.component.html',
	styleUrls: ['./search-to-do-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchToDoTaskComponent implements SearchUseCase<ToDoTask>, OnInit, OnDestroy {

@ViewChild(AverosSearchEntityComponent, {static: true}) averosSearchEntity!: AverosSearchEntityComponent<ToDoTask>;
  
  targetEntity =  ToDoTask.instanceMetadata;
 viewLayout = ToDoTask.getEntityViewLayout();
 searchInputFormGoup: FormGroup;// = this.buildForm();

 searchUseCaseViewLayout = ToDoTask.getUseCaseViewLayout(UseCase.SEARCH_INPUT);
 useCaseConfig: UseCaseConfig<ToDoTask> = {
                                                  componentAppearance: 'outline',
                                                  iconLayout: 'component',
                                                  entityType: ToDoTask,
                                                  entity: undefined
                                                };
  showSearchResult = false;
  searchCriteria!: SearchInputCriteria;
  tableValues$!: Observable<ToDoTask[]> ;
  private genericDialog = new MatDialogConfig();
  private deleteSubscription!: Subscription;


  /**
   * 
   * @param objectSubjectToAction 
   * @param avConfig 
   * @returns the new object
   * This function defines the business logic to perform when when updating an existing object or submitting
   *  a new object
   */
  onAddOrUpateCallback = (objectSubjectToAction: ToDoTask, avConfig: AverosViewConfig): Observable<ToDoTask> => {
    if (avConfig.useCaseConfig?.useCase===UseCase.CREATE){
      return this.entityService.createEntity(objectSubjectToAction);

    } else if (avConfig.useCaseConfig?.useCase===UseCase.EDIT ||
                avConfig.useCaseConfig?.useCase===UseCase.UPDATE ){
     return this.entityService.updateEntity(avConfig.value[TypeScriptTypeMetaDatatHandler.instance.getIdName(this.targetEntity)], objectSubjectToAction);
    }
    return of();
    
  }
  constructor(private entityService: ToDoTaskService,
              private formControlService: FormControlService,
              private alertService: AlertService,
              public dialog: MatDialog,
              private router: Router,
              private viewLayoutService: ViewLayoutService,
              private route: ActivatedRoute) {
                this.searchInputFormGoup = this.formControlService.buildUseCaseFormFromEntityType(ToDoTask, UseCase.SEARCH_INPUT);
               }

  ngOnDestroy(): void {

    this.deleteSubscription?.unsubscribe();
  }
  
  trackBy(entity: any) {
    return entity[TypeScriptTypeMetaDatatHandler.instance.getIdName(this.targetEntity)];
  }

  edit(entity: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        usecase: UseCase.EDIT,
      }
    };
    this.router.navigate(['/todotasks/edit', entity[TypeScriptTypeMetaDatatHandler.instance.getIdName(this.targetEntity)]], navigationExtras);
  }
  delete(valueToBeDeleted: ToDoTask) {
    const idName = TypeScriptTypeMetaDatatHandler.instance.getIdName(this.targetEntity);
        this.deleteSubscription = this.entityService.deleteEntity((valueToBeDeleted as any)[idName])
            .subscribe({
              next: (deletedEntity: ToDoTask) => {
                this.alertService.success($localize`:@@uc.delete.entity:Entity ${valueToBeDeleted.name}:entity:
                has been deleted successfully`);
                this.tableValues$ = this.tableValues$.pipe(map(e=>e.filter(el=> (el as any)[idName] !== (valueToBeDeleted as any)[idName])));
                this.deleteSubscription?.unsubscribe();
              },
              error: err => {
                console.log(err);
                this.deleteSubscription?.unsubscribe();
        }});
  }
  reloadData(t: any) {
    this.tableValues$ = this.entityService.getAllEntities();
  }

  search(event: any) {
    this.tableValues$ = this.entityService.getEntitiesByCriteria(event);
  }

  add(entity: any) {

    let averosDialogViewConfig: AverosDialogViewConfig = {
                              objectClass: ToDoTask, 
                              compositeObject: {value: ToDoTask.instanceMetadata, type: 'ToDoTask'},
                              onSubmitCallback: this.onAddOrUpateCallback,
                              onLoadCallback: undefined,
                              viewLayout : { 
                                            useCase: UseCase.CREATE,
                                            editMode: true,
                                            canActivateEditMode: true
                                          }
                            };

    const viewConfig = this.viewLayoutService.buildAverosDialogViewConfig(averosDialogViewConfig);
    this.genericDialog.data = viewConfig;
    this.dialog.open(AverosDynamicDialogComponent, this.genericDialog);
  
  }

  view(entity: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        usecase: UseCase.VIEW,
      }
    };
    this.router.navigate(['/todotasks/view/', entity[TypeScriptTypeMetaDatatHandler.instance.getIdName(this.targetEntity)]], navigationExtras);
  }

/**
* This function handles a one-to-one and one-to-many relationships in a view composite relation use case
* Please do not modify or update the function structure since it's is auto-updated when including additional entity members
*/
  viewCompositeObject(compositeObject: { value: unknown; type: string; compositeType?: string; }) {
    let averosDialogViewConfig: AverosDialogViewConfig =
    
    {
                                  objectClass: null, ////example User (type not string)
                                  compositeObject: compositeObject,
                                  onSubmitCallback: (a: any,b: any)=>{},
                                  onLoadCallback:  undefined,
                                  viewLayout : { useCase: -1,
                                                 editMode: false,
                                                 canActivateEditMode: false
                                               }
        };

    if (compositeObject?.compositeType === 'collection'){ /// handles One-To-Many relationship if any

    }
    else {
      averosDialogViewConfig.viewLayout.useCase = UseCase.VIEW;
      if (compositeObject.type === 'User'){// User Entity this is an Averos type but it could be overriden at your convenience
        averosDialogViewConfig.objectClass= User;

      }
    
      if (compositeObject.type === 'ToDoArea'){
      averosDialogViewConfig.objectClass= ToDoArea;
    }
      
}

    const viewConfig = this.viewLayoutService.buildAverosDialogViewConfig(averosDialogViewConfig);
    this.genericDialog.data = viewConfig;
    this.dialog.open(AverosDynamicDialogComponent, this.genericDialog);
  }

  ngOnInit(): void {

    this.initializeEntityDialogs();
     /**
     * get back to the previous search criterias history
     */
      if (window.history.state.searchInputCriteria){
        this.averosSearchEntity.matExpansionPanel.close();
        this.searchCriteria = new SearchInputCriteria(new Map(JSON.parse(window.history.state?.searchInputCriteria?.searchCriteria)));
        this.showSearchResult = true;
      }
  }

  searchEntities(searchInputCriteria: SearchInputCriteria) {
    this.showSearchResult = true;
    this.searchCriteria = searchInputCriteria;
    
    const queryParams: Params = { searchCriteria: JSON.stringify([...this.searchCriteria.getCriteriaMap()]) };
    this.router.navigate([], 
                          {
                            relativeTo: this.route,
                            state: {
                              searchInputCriteria: queryParams
                            }
                          }
                      );
  }

  initializeEntityDialogs(){
    this.genericDialog.disableClose = true;
    this.genericDialog.autoFocus = false;
    this.genericDialog.width = '90%';
    this.genericDialog.height = '90%';
    this.genericDialog.maxWidth = '100vw';
    this.genericDialog.maxHeight = '100vh';
  }

}