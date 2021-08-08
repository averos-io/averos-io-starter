import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTaskService } from './to-do-task.service';

describe('ToDoTaskService', () => {
  let component: ToDoTaskService;
  let fixture: ComponentFixture<ToDoTaskService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTaskService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});