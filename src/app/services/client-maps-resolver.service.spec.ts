import { TestBed, inject } from '@angular/core/testing';

import { ClientMapsResolverService } from './client-maps-resolver.service';

describe('ClientMapsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientMapsResolverService]
    });
  });

  it('should be created', inject([ClientMapsResolverService], (service: ClientMapsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
