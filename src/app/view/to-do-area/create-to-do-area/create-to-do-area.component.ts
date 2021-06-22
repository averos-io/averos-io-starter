import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService, CreateViewEditUseCase, EntityAlteredRelationEventData, 
         FormControlService, UseCase, UseCaseConfig, UseCaseViewLayout } from '@wiforge/averos';
import { Observable, Subscription } from 'rxjs';
import { ToDoArea } from '../../../model/to-do-area';
import { ToDoAreaService } from '../../../service/to-do-area.service';


@Component({
  selector: 'app-create-to-do-area',
  templateUrl: './create-to-do-area.component.html',
  styleUrls: ['./create-to-do-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateToDoAreaComponent implements CreateViewEditUseCase<ToDoArea>, OnInit {

  useCaseViewLayout: Observable<UseCaseViewLayout<ToDoArea>> = null;
  componentNewValue =  new ToDoArea();
  reactiveForm: FormGroup = null;
  useCaseConfig: UseCaseConfig<ToDoArea> = {
                                          componentAppearance: 'outline',
                                          iconLayout: 'component',
                                          entity: this.componentNewValue,
                                          entityType: ToDoArea,
                                          useCase: UseCase.CREATE
                                       };
  editModeActivated = true;// true for Create UseCases

  userSubscription: Subscription;

  constructor(private entityService: ToDoAreaService,
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
    this.useCaseViewLayout = ToDoArea.getUseCaseViewLayout(UseCase.CREATE);
    this.reactiveForm = this.formControlService.buildUseCaseFormFromEntityType(
      ToDoArea, UseCase.CREATE
      );
  }

  onSubmit(submittedValue: ToDoArea){
    this.componentNewValue = submittedValue;
    this.entityService.createEntity(this.componentNewValue).subscribe(
        (submittedEntity: ToDoArea) => {
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
