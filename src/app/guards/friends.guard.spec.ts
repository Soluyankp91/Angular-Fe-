import { TestBed } from '@angular/core/testing';

import { FriendsGuard } from './friends.guard';

describe('FriendsGuard', () => {
  let guard: FriendsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FriendsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
