import { TestBed } from '@angular/core/testing';

import { ParametersFilterService } from './parameters-filter.service';

describe('ParametersFilterService', () => {
  let service: ParametersFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametersFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
