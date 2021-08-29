import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsFindComponent } from './friends-find.component';

describe('FriendsFindComponent', () => {
  let component: FriendsFindComponent;
  let fixture: ComponentFixture<FriendsFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
