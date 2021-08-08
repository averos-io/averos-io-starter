import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToDoTaskComponent } from './search-to-do-task.component';

describe('SearchToDoTaskComponent', () => {
  let component: SearchToDoTaskComponent;
  let fixture: ComponentFixture<SearchToDoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchToDoTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToDoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});