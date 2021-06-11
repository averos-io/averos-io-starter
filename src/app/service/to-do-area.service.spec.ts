import { TestBed } from '@angular/core/testing';

import { ToDoAreaService } from './to-do-area.service';

describe('ToDoAreaService', () => {
  let service: ToDoAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
