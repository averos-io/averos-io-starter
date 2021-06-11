import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService, CreateViewEditUseCase, EntityAlteredRelationEventData, FormControlService, UseCase, UseCaseConfig } from '@wiforge/averos';
import { UseCaseViewLayout } from '@wiforge/averos/view/_models/entity-view-layout/use-case-view-layout';
import { Observable, Subscription } from 'rxjs';
import { ToDoArea } from 'src/app/model/to-do-area';
import { ToDoAreaService } from 'src/app/service/to-do-area.service';

@Component({
  selector: 'app-create-to-do-area',
  templateUrl: './create-to-do-area.component.html',
  styleUrls: ['./create-to-do-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateToDoAreaComponent implements CreateViewEditUseCase<ToDoArea>, OnInit {

  useCaseViewLayout: Observable<UseCaseViewLayout<ToDoArea>> = null;
  toDoArea =  new ToDoArea();
  reactiveForm: FormGroup = null;
  useCaseConfig: UseCaseConfig<ToDoArea> = {
                                          componentAppearance: 'outline',
                                          iconLayout: 'component',
                                          entity: this.toDoArea,
                                          useCase: UseCase.VIEW
                                       };
  editModeActivated: boolean;// true for Create UseCases

  userSubscription: Subscription;

  constructor(private toDoAreaService: ToDoAreaService,
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
      );;
  }

  onSubmit(toDoArea: ToDoArea){
    this.toDoArea = toDoArea;
    this.toDoAreaService.createToDoArea(this.toDoArea).subscribe(
        (toDoArea: ToDoArea) => {
          this.alertService.success($localize`:@@uc.create.entity:Area ${toDoArea.name}:entity:
           has been created successfully`);
          this.editModeActivated = false;
          this.reactiveForm.reset(this.toDoArea);
        },
        err => {
          console.log(err); 
        }); 
  }

}
