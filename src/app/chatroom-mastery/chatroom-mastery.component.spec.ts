import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomMasteryComponent } from './chatroom-mastery.component';

describe('ChatroomMasteryComponent', () => {
  let component: ChatroomMasteryComponent;
  let fixture: ComponentFixture<ChatroomMasteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomMasteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomMasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
