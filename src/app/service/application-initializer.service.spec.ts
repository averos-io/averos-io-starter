
import { TestBed } from '@angular/core/testing';

import { ApplicationInitializerService } from './application-initializer.service';

describe('ApplicationInitializerService', () => {
  let service: ApplicationInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});