import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToDoTaskComponent } from './create-to-do-task.component';

describe('CreateToDoTaskComponent', () => {
  let component: CreateToDoTaskComponent;
  let fixture: ComponentFixture<CreateToDoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateToDoTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToDoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
