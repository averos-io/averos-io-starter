import { ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService, FormControlService, UseCase, UseCaseConfig,
         UseCaseViewLayout, CreateViewEditUseCase, 
         EntityAlteredRelationEventData, TypeScriptTypeMetaDatatHandler, UseCaseAction } from '@wiforge/averos';
import { Observable, Subscription } from 'rxjs';


import { ToDoTask } from '../../../model/to-do-task';


import { ToDoTaskService } from '../../../service/to-do-task.service';


@Component({
	selector: 'app-create-to-do-task-component',
	templateUrl: './create-to-do-task.component.html',
	styleUrls: ['./create-to-do-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateToDoTaskComponent implements CreateViewEditUseCase<ToDoTask>, OnInit, OnDestroy {

useCaseViewLayout!: Observable<UseCaseViewLayout<ToDoTask>>;
  componentNewValue =  new ToDoTask();
  reactiveForm!: FormGroup;
  useCaseConfig: UseCaseConfig<ToDoTask> = {
                                          componentAppearance: 'outline',
                                          iconLayout: 'component',
                                          entity: this.componentNewValue,
                                          entityType: ToDoTask,
                                          useCase: UseCase.CREATE
                                       };
  editModeActivated = true;// true for Create UseCases

  createEntitySubscription!: Subscription;
  updateEntitySubscription!: Subscription;
  addRelationSubscription!: Subscription;
  deleteRelationSubscription!: Subscription;



  
  constructor(private entityService: ToDoTaskService,
              private alertService: AlertService,
              private formControlService: FormControlService) {
               }

  ngOnDestroy(): void {
    this.addRelationSubscription?.unsubscribe();
    this.deleteRelationSubscription?.unsubscribe();
    this.createEntitySubscription?.unsubscribe();
    this.updateEntitySubscription?.unsubscribe();
  }
  
  /**
   * This method will be called in a create entity use case if you happen to have a One To Many relationship 
   * with another composite entity and you wish to include child enties addition/removal when you create a parent entity instance
   * The method wont be called if no composite OneToMany relationship is configured in the parent's CreateUCViewLayout
   * @param entityAlteredRelationEventData 
   */
  updateRelationCollection(entityAlteredRelationEventData: EntityAlteredRelationEventData) {
     
    let  idName = TypeScriptTypeMetaDatatHandler.instance.getIdName(this.useCaseConfig.entityType)
    if (entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction.length > 0){
      // handle the relation collection data by action
      switch(entityAlteredRelationEventData.action) {
        case UseCaseAction.DELETE:
          this.deleteRelationSubscription = this.entityService.deleteRelationCollection((this.useCaseConfig.entity as any)[idName], 
                entityAlteredRelationEventData.actionEventData.relationName,
                entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction).subscribe(
                  (updates: any) => {
                    this.alertService.success($localize`:@@uc.update.entity:Entity ${this.useCaseConfig.entity?.name}:entity:
                      has been updated successfully`); 
                    this.deleteRelationSubscription?.unsubscribe();                                                    
                  },
                  err => {
                    console.log(err);
                    this.alertService.error($localize`:@@uc.update.entity.error:Entity ${this.useCaseConfig.entity?.name}:entity:
                      cannot be updated`);
                    this.deleteRelationSubscription?.unsubscribe();                                                    
                  }
                );
          break;
        case UseCaseAction.ADD:
          this.addRelationSubscription = this.entityService.addRelationCollection((this.useCaseConfig.entity as any)[idName], 
                entityAlteredRelationEventData.actionEventData.relationName,
                entityAlteredRelationEventData.actionEventData.formattedIdsSubjectToAction).subscribe(
                  (updates: any) => {
                    this.alertService.success($localize`:@@uc.update.entity:Entity ${this.useCaseConfig.entity?.name}:entity:
                      has been updated successfully`);     
                    this.addRelationSubscription?.unsubscribe();                                                 
                  },
                  err => {
                    console.log(err);
                    this.alertService.error($localize`:@@uc.update.entity.error:Entity ${this.useCaseConfig.entity?.name}:entity:
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

  clone(){
    this.editModeActivated = !this.editModeActivated;
    this.useCaseConfig.useCase = UseCase.CREATE;
  }

  updateEditMode(event: boolean) {
    this.editModeActivated = event;
    if (!this.editModeActivated){
      this.useCaseConfig.useCase = UseCase.VIEW;
    }
  }

  edit() {
    this.editModeActivated = !this.editModeActivated;
    this.useCaseConfig.useCase = UseCase.EDIT;
  }

  ngOnInit(): void {
    this.useCaseViewLayout = ToDoTask.getUseCaseViewLayout(UseCase.CREATE);
    this.reactiveForm = this.formControlService.buildUseCaseFormFromEntityType(
      ToDoTask, UseCase.CREATE
      );
  }

  onSubmit(submittedValue: ToDoTask){
    this.componentNewValue = submittedValue;
    if (this.useCaseConfig.useCase === UseCase.CREATE){
      this.createEntitySubscription = this.entityService.createEntity(this.componentNewValue).subscribe(
        (submittedEntity: ToDoTask) => {
          this.alertService.success($localize`:@@uc.create.entity:Entity ${submittedEntity.name}:entity:
           has been created successfully`);
          this.editModeActivated = false;
          this.reactiveForm.reset(this.componentNewValue);
          this.useCaseConfig.entity = submittedEntity;
          this.useCaseConfig.useCase = UseCase.VIEW;
          
          this.createEntitySubscription?.unsubscribe();
        },
        err => {
          console.log(err); 
          this.createEntitySubscription?.unsubscribe();
        }); 
    } else if (this.useCaseConfig.useCase === UseCase.EDIT){
        this.updateEntitySubscription = this.entityService.updateEntity(((this.useCaseConfig.entity) as any)[TypeScriptTypeMetaDatatHandler
                  .instance.getIdName(this.useCaseConfig.entityType)],this.componentNewValue).subscribe(
          (submittedEntity: ToDoTask) => {
            this.alertService.success($localize`:@@uc.update.entity:Entity ${submittedEntity.name}:entity:
            has been updated successfully`);
            this.editModeActivated = false;
            this.reactiveForm.reset(this.componentNewValue);
            this.useCaseConfig.entity = submittedEntity;
            this.useCaseConfig.useCase = UseCase.VIEW;
            
            this.updateEntitySubscription?.unsubscribe();
          },
          err => {
            console.log(err); 
            this.updateEntitySubscription?.unsubscribe();
          }); 
    }
  }

}