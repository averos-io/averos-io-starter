import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoAreaDetailsComponent } from './to-do-area-details.component';

describe('ToDoAreaDetailsComponent', () => {
  let component: ToDoAreaDetailsComponent;
  let fixture: ComponentFixture<ToDoAreaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoAreaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoAreaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});