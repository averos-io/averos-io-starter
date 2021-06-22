import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService, CreateViewEditUseCase, EntityAlteredRelationEventData, 
         FormControlService, UseCase, UseCaseConfig, UseCaseViewLayout } from '@wiforge/averos';
import { Observable, Subscription } from 'rxjs';
import { ToDoTask } from '../../../model/to-do-task';
import { ToDoTaskService } from '../../../service/to-do-task.service';

@Component({
  selector: 'app-create-to-do-task',
  templateUrl: './create-to-do-task.component.html',
  styleUrls: ['./create-to-do-task.component.scss']
})
export class CreateToDoTaskComponent implements CreateViewEditUseCase<ToDoTask>, OnInit {

  useCaseViewLayout: Observable<UseCaseViewLayout<ToDoTask>> = null;
  componentNewValue =  new ToDoTask();
  reactiveForm: FormGroup = null;
  useCaseConfig: UseCaseConfig<ToDoTask> = {
                                          componentAppearance: 'outline',
                                          iconLayout: 'component',
                                          entity: this.componentNewValue,
                                          entityType: ToDoTask,
                                          useCase: UseCase.CREATE
                                       };
  editModeActivated = true;// true for Create UseCases

  userSubscription: Subscription;

  constructor(private entityService: ToDoTaskService,
              private alertService: AlertService,
              private formControlService: FormControlService) { }
  
  updateRelationCollection(entityAlteredRelationEventData: EntityAlteredRelationEventData) {
    throw new Error('Method not implemented.');
  }

  clone(){
    this.editModeActivated = !this.editModeActivated;
  }

  updateEditMode(event: boolean) {
    this.editModeActivated = event;
  }

  edit() {
    this.editModeActivated = !this.editModeActivated;
  }

  ngOnInit(): void {
    this.useCaseViewLayout = ToDoTask.getUseCaseViewLayout(UseCase.CREATE);
    this.reactiveForm = this.formControlService.buildUseCaseFormFromEntityType(
      ToDoTask, UseCase.CREATE
      );
  }

  onSubmit(submittedValue: ToDoTask){
    this.componentNewValue = submittedValue;
    this.entityService.createEntity(this.componentNewValue).subscribe(
        (submittedEntity: ToDoTask) => {
          this.alertService.success($localize`:@@uc.create.entity:Entity ${submittedEntity.name}:entity:
           has been created successfully`);
          this.editModeActivated = false;
          this.reactiveForm.reset(this.componentNewValue);
        },
        err => {
          console.log(err); 
        }); 
  }

}
