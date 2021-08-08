import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoAreaService } from './to-do-area.service';

describe('ToDoAreaService', () => {
  let component: ToDoAreaService;
  let fixture: ComponentFixture<ToDoAreaService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoAreaService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoAreaService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});