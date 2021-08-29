import { TestBed } from '@angular/core/testing';

import { FriendsFindService } from './friends-find.service';

describe('FriendsFindService', () => {
  let service: FriendsFindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsFindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
