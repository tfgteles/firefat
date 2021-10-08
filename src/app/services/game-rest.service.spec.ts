import { TestBed } from '@angular/core/testing';

import { GameRestService } from './game-rest.service';

describe('GameRestService', () => {
  let service: GameRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
