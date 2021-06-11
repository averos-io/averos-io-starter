import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToDoAreaComponent } from './create-to-do-area.component';

describe('CreateToDoAreaComponent', () => {
  let component: CreateToDoAreaComponent;
  let fixture: ComponentFixture<CreateToDoAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateToDoAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToDoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
