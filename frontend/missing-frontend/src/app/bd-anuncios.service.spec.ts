import { TestBed } from '@angular/core/testing';

import { BdAnunciosService } from './bd-anuncios.service';

describe('BdAnunciosService', () => {
  let service: BdAnunciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdAnunciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
