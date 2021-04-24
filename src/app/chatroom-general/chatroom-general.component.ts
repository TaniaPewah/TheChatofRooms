import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatroom-general',
  templateUrl: './chatroom-general.component.html',
  styleUrls: ['./chatroom-general.component.css']
})
export class ChatroomGeneralComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller')
  private feedContainer!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = 
      this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }
}
