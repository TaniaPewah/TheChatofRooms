import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomGeneralComponent } from './chatroom-general.component';

describe('ChatroomGeneralComponent', () => {
  let component: ChatroomGeneralComponent;
  let fixture: ComponentFixture<ChatroomGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
