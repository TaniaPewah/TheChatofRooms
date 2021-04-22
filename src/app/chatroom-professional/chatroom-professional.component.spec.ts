import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomProfessionalComponent } from './chatroom-professional.component';

describe('ChatroomProfessionalComponent', () => {
  let component: ChatroomProfessionalComponent;
  let fixture: ComponentFixture<ChatroomProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
