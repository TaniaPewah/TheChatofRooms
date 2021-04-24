import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp!: any;
  isOwnMessage!: boolean;
  ownEmail!: string;

  constructor( private authService: AuthService) { 
    this.chatMessage = {};
    this.userName = '';
    this.userEmail = '';
    this.messageContent = '';

    authService.authUser().subscribe((user: { email: string; }) => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit( chatMessage = this.chatMessage ): void {
    this.messageContent = chatMessage.message!;
    this.timeStamp = chatMessage.timeSent!;
    this.userName = chatMessage.userName!;
    this.userEmail = chatMessage.email!;
  }
}
