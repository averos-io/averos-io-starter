import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { slideInOutAnimation,CreateViewEditUseCase, UseCase, UseCaseConfig,
		 AlertService, FormControlService, EntityAlteredRelationEventData, TypeScriptTypeMetaDatatHandler,
		 UseCaseAction, UseCaseViewLayout } from '@wiforge/averos';
import { ToDoArea } from '../../../model/to-do-area';
import { ToDoAreaService } from '../../../service/to-do-area.service';


@Component({
  selector: 'app-to-do-area-details-component',
  templateUrl: './to-do-area-details.component.html',
  styleUrls: ['./to-do-area-details.component.scss'],
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoAreaDetailsComponent implements CreateViewEditUseCase<ToDoArea>, OnInit, OnDestroy {
  useCaseViewLayout!: Observable<UseCaseViewLayout<ToDoArea>>; 
  reactiveForm!: FormGroup;
  useCaseConfig: UseCaseConfig<ToDoArea> = {
                                          componentAppearance: 'outline',
                                          iconLayout: 'component',
                                          entity: undefined,
                                          entityType: ToDoArea,
                                          useCase: undefined
                                       };
  editModeActivated = false;
  currentUseCase: UseCase;

  useCaseEntity!: ToDoArea;
  private userSubscription!: Subscription;
  private addRelationSubscription!: Subscription;
  private deleteRelationSubscription!: Subscription;
  private updateEntitySubscription!: Subscription;
  private createEntitySubscription!: Subscription;

  constructor(private entityService: ToDoAreaService,
              private alertService: AlertService,
              private formControlService: FormControlService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef) {

    const navigation = this.router.getCurrentNavigation();
    this.currentUseCase = navigation?.extras.state?.usecase ? navigation.extras.state?.usecase : UseCase.VIEW;

    if (this.currentUseCase === UseCase.EDIT || 
        this.currentUseCase === UseCase.CREATE || 
        this.currentUseCase === UseCase.UPDATE){
      this.editModeActivated = true;
    } else if (this.currentUseCase === UseCase.VIEW){
      this.editModeActivated = false;
    }

    this.updateUseCaseViewData(this.currentUseCase);
    
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.addRelationSubscription?.unsubscribe();
    this.deleteRelationSubscription?.unsubscribe();
    this.updateEntitySubscription?.unsubscribe();
    this.createEntitySubscription?.unsubscribe();
  }

  get useCase() {
    return UseCase;
  }
  
  onSubmit(submittedValue: ToDoArea) {
    // handles updates in case of EDIT use case
    if (this.currentUseCase === UseCase.EDIT || this.currentUseCase === UseCase.UPDATE){
       this.updateEntitySubscription = this.entityService.updateEntity(this.useCaseConfig.entity?.id, submittedValue).subscribe(
        (updatedEntity: ToDoArea) => {
          this.alertService.success($localize`:@@uc.update.entity:Entity ${updatedEntity.name}:entity:
           has been updated successfully`);
          
          this.editModeActivated = false;
          this.updateView(UseCase.VIEW, updatedEntity);
          this.updateEntitySubscription?.unsubscribe();
        },
        err => {
          console.log(err);
          this.updateEntitySubscription?.unsubscribe();
        });
    } else if (this.currentUseCase === UseCase.CREATE){
      this.createEntitySubscription = this.entityService.createEntity(submittedValue).subscribe(
        (createdEntity: ToDoArea) => {
          this.alertService.success($localize`:@@uc.create.entity:Entity ${createdEntity.name}:entity:
           has been created successfully`);
          this.editModeActivated = false;
          this.updateView(UseCase.VIEW, createdEntity);
          this.createEntitySubscription?.unsubscribe();
         
        },
        err => {
          console.log(err);
          this.createEntitySubscription?.unsubscribe();
        });
    }

  }

   /**
   * updateRelationCollection updates the related entity with the resulted collection
   * either by adding a new value (in case of addition) or by deleting an existing value from the related collection
   */
  updateRelationCollection(entityAlteredRelationEventData: EntityAlteredRelationEventData){
     let  idName = TypeScriptTypeMetaDatatHandler.instance.getIdName(this.useCaseConfig.entityType)
    if (entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction.length > 0){
      // handle the relation collection data by action
      switch(entityAlteredRelationEventData.action) {
        case UseCaseAction.DELETE:
              this.deleteRelationSubscription = this.entityService.deleteRelationCollection((this.useCaseEntity as any)[idName], 
                entityAlteredRelationEventData.actionEventData.relationName,
                entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction).subscribe(
                  (updates: any) => {
                    this.alertService.success($localize`:@@uc.update.entity:Entity ${this.useCaseEntity.name}:entity:
                      has been updated successfully`); 
                    this.deleteRelationSubscription?.unsubscribe();                                                     
                  },
                  err => {
                    console.log(err);
                    this.alertService.error($localize`:@@uc.update.entity.error:Entity ${this.useCaseEntity.name}:entity:
                      cannot be updated`); 
                    this.deleteRelationSubscription?.unsubscribe();                                                    
                  }
                );
          break;
        case UseCaseAction.ADD:
              this.addRelationSubscription = this.entityService.addRelationCollection((this.useCaseEntity as any)[idName], 
                entityAlteredRelationEventData.actionEventData.relationName,
                entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction).subscribe(
                  (updates: any) => {
                    this.alertService.success($localize`:@@uc.update.entity:Entity ${this.useCaseEntity.name}:entity:
                      has been updated successfully`);        
                    this.addRelationSubscription?.unsubscribe();                                              
                  },
                  err => {
                    console.log(err);
                    this.alertService.error($localize`:@@uc.update.entity.error:Entity ${this.useCaseEntity.name}:entity:
                      cannot be updated`);  
                    this.addRelationSubscription?.unsubscribe();                                                    
                  }
                );
            
          break;
        default:
          break;
      }
    }  
  }

  ngOnInit(): void {
  }

  clone() {
    this.editModeActivated = !this.editModeActivated;
    this.updateUseCaseViewData(UseCase.CREATE);
  }

  edit() {
    this.editModeActivated = !this.editModeActivated;
    this.updateUseCaseViewData(UseCase.EDIT);
  }

  updateEditMode(event: boolean) {
    this.editModeActivated = event;
    this.updateUseCaseViewData(this.editModeActivated ? UseCase.EDIT : UseCase.VIEW);
  }

    /**
   * Updates the view depending on the current use case (VIEW or EDIT|CREATE)
   *  described by editModeActivated = (true|false)
   */
     updateUseCaseViewData(useCase: UseCase) {

      const id = this.route.snapshot.paramMap.get('id');
  
      if (id){
        this.userSubscription = this.entityService.getEntityById(id)
          .subscribe(entity => {
            this.updateView(useCase, entity);
          });
      }
    }

    /**
   * Get back to the latest previous location
   */
  getBack() {
    this.location.back();
  }

  updateView(useCase: UseCase, entity: any){
    this.currentUseCase = useCase;
    this.useCaseViewLayout = ToDoArea.getUseCaseViewLayout(this.currentUseCase);
    this.reactiveForm = this.formControlService.buildUseCaseFormFromEntityType(ToDoArea, useCase);
    this.useCaseEntity = entity;
    this.reactiveForm.reset(this.useCaseEntity);
    this.useCaseConfig = {
                          componentAppearance: 'outline',
                          iconLayout: 'component',
                          entity: this.useCaseEntity,
                          entityType: this.useCaseConfig.entityType,
                          useCase: this.currentUseCase
                         };
    this.cd.markForCheck();
  }

}
