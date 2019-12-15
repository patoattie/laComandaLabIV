import { TestBed } from '@angular/core/testing';

import { DetallesComandaService } from './detalles-comanda.service';

describe('DetallesComandaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetallesComandaService = TestBed.get(DetallesComandaService);
    expect(service).toBeTruthy();
  });
});
