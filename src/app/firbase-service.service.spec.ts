import { TestBed } from '@angular/core/testing';

import { FirbaseServiceService } from './firbase-service.service';

describe('FirbaseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirbaseServiceService = TestBed.get(FirbaseServiceService);
    expect(service).toBeTruthy();
  });
});
