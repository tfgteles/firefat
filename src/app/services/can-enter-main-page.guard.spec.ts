import { TestBed } from '@angular/core/testing';

import { CanEnterMainPageGuard } from './can-enter-main-page.guard';

describe('CanEnterMainPageGuard', () => {
  let guard: CanEnterMainPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEnterMainPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
