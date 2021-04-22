import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFeedComponent } from './room-feed.component';

describe('RoomFeedComponent', () => {
  let component: RoomFeedComponent;
  let fixture: ComponentFixture<RoomFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
