import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTaskDetailsComponent } from './to-do-task-details.component';

describe('ToDoTaskDetailsComponent', () => {
  let component: ToDoTaskDetailsComponent;
  let fixture: ComponentFixture<ToDoTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTaskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
