import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoTask } from '../../../model/to-do-task';
import { ToDoTaskService } from '../../../service/to-do-task.service';
import { AlertService, CreateViewEditUseCase, EntityAlteredRelationEventData, FormControlService, slideInOutAnimation, TypeScriptTypeMetaDatatHandler, UseCase, UseCaseAction, UseCaseConfig, UseCaseViewLayout } from '@wiforge/averos';
@Component({
  selector: 'app-to-do-task-details',
  templateUrl: './to-do-task-details.component.html',
  styleUrls: ['./to-do-task-details.component.scss'],
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTaskDetailsComponent implements CreateViewEditUseCase<ToDoTask>, OnInit, OnDestroy {
  useCaseViewLayout: Observable<UseCaseViewLayout<ToDoTask>> = null; 
  reactiveForm: FormGroup = null;
  useCaseConfig: UseCaseConfig<ToDoTask> = {
                                          componentAppearance: 'outline',
                                          iconLayout: 'component',
                                          entity: null,
                                          entityType: ToDoTask,
                                          useCase: null
                                       };
  editModeActivated = false;
  currentUseCase: UseCase;

  useCaseEntity: ToDoTask;
  userSubscription: Subscription;

  constructor(private entityService: ToDoTaskService,
              private alertService: AlertService,
              private formControlService: FormControlService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef) {

    const navigation = this.router.getCurrentNavigation();
    this.currentUseCase = navigation.extras.state?.usecase ? navigation.extras.state?.usecase : UseCase.VIEW;

    if (this.currentUseCase === UseCase.EDIT || 
        this.currentUseCase === UseCase.CREATE || 
        this.currentUseCase === UseCase.UPDATE){
      this.editModeActivated = true;
    } else if (this.currentUseCase === UseCase.VIEW){
      this.editModeActivated = false;
    }

    this.updateUseCaseViewData(this.currentUseCase);
    
  }

  /**
   * updateRelationCollection updates the related entity with the resulted collection
   * either by adding a new value (in case of addition) or by deleting an existing value from the related collection
   */
   updateRelationCollection(entityAlteredRelationEventData: EntityAlteredRelationEventData){
    const memberType = TypeScriptTypeMetaDatatHandler.instance.getMemberType(ToDoTask.instanceMetadata, entityAlteredRelationEventData.actionEventData.relationName);
    /// Handles relation with Role
    if (memberType instanceof ToDoTask){
      if (entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction.length > 0){
        
        // handle the relation collection data by action
        switch(entityAlteredRelationEventData.action) {
          case UseCaseAction.DELETE:
                /// delete an element from the list of roles that are assigned to the user
                this.entityService.deleteRelationCollection(this.useCaseEntity.id, 
                  entityAlteredRelationEventData.actionEventData.relationName,
                  entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction).subscribe(
                    (updates: any) => {
                      this.alertService.success($localize`:@@uc.update.entity:Entity ${this.useCaseEntity.name}:entity:
                        has been updated successfully`);                                                     
                    },
                    err => {
                      console.log(err);
                      this.alertService.error($localize`:@@uc.update.entity.error:Entity ${this.useCaseEntity.name}:entity:
                        cannot be updated`);                                                     
                    }
                  );
            break;
          case UseCaseAction.ADD:
                /// add elements from to the list of roles that are assigned to the user
                this.entityService.addRelationCollection(this.useCaseEntity.id, 
                  entityAlteredRelationEventData.actionEventData.relationName,
                  entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction).subscribe(
                    (updates: any) => {
                      this.alertService.success($localize`:@@uc.update.entity:User ${this.useCaseEntity.name}:entity:
                        has been updated successfully`);                                                     
                    },
                    err => {
                      console.log(err);
                      this.alertService.error($localize`:@@uc.update.entity.error:User ${this.useCaseEntity.name}:entity:
                        cannot be updated`);                                                     
                    }
                  );
              
            break;
          default:
            break;
        }
      }    
    }
  
  
    }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  get useCase() {
    return UseCase;
  }
  
  onSubmit(submittedValue: ToDoTask) { 
    // handles updates in case of EDIT use case
    if (this.currentUseCase === UseCase.EDIT || this.currentUseCase === UseCase.UPDATE){
      this.entityService.updateEntity(this.useCaseConfig.entity?.id, submittedValue).subscribe(
        (updatedEntity: ToDoTask) => {
          this.alertService.success($localize`:@@uc.update.entity:Entity ${updatedEntity.name}:entity:
           has been updated successfully`);
          
          this.editModeActivated = false;
          this.updateView(UseCase.VIEW, updatedEntity);
        },
        err => {
          console.log(err);
        });
    } else if (this.currentUseCase === UseCase.CREATE){
      this.entityService.createEntity(submittedValue).subscribe(
        (updatedEntity: ToDoTask) => {
          this.alertService.success($localize`:@@uc.create.entity:Entity ${updatedEntity.name}:entity:
           has been updated successfully`);
          this.editModeActivated = false;
          this.updateView(UseCase.VIEW, updatedEntity);
         
        },
        err => {
          console.log(err);
        });
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

      // const id = +this.route.snapshot.paramMap.get('id');
      const id = this.route.snapshot.paramMap.get('id');
  
      this.userSubscription = this.entityService.getEntityById(id)
        .subscribe(entity => {
          this.updateView(useCase, entity);
        });
    }

    /**
   * Get back to the latest previous location
   */
  getBack() {
    this.location.back();
  }

  updateView(useCase: UseCase, entity: any){
    this.currentUseCase = useCase;
    this.useCaseViewLayout = ToDoTask.getUseCaseViewLayout(this.currentUseCase);
    this.reactiveForm = this.formControlService.buildUseCaseFormFromEntityType(ToDoTask, useCase);
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

