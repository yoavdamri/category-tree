import { TestBed } from '@angular/core/testing';

import { CategManagerService } from './categ-manager.service';

describe('CategManagerService', () => {
  let service: CategManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
