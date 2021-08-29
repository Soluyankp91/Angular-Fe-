import { TestBed } from '@angular/core/testing';

import { FriendsFindGuard } from './friends-find.guard';

describe('FriendsFindGuard', () => {
  let guard: FriendsFindGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FriendsFindGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
