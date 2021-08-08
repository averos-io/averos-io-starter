import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToDoAreaComponent } from './search-to-do-area.component';

describe('SearchToDoAreaComponent', () => {
  let component: SearchToDoAreaComponent;
  let fixture: ComponentFixture<SearchToDoAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchToDoAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToDoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});