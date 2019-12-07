import { TestBed } from '@angular/core/testing';

import { KeyaddService } from './keyadd.service';

describe('KeyaddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyaddService = TestBed.get(KeyaddService);
    expect(service).toBeTruthy();
  });
});
