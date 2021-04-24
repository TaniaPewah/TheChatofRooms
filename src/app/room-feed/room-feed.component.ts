import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-room-feed',
  templateUrl: './room-feed.component.html',
  styleUrls: ['./room-feed.component.css']
})
export class RoomFeedComponent implements OnInit {

  feed: ChatMessage[];
  user : any = {};
  constructor(private chatService: ChatService,  
    private afAuth: AngularFireAuth,
    private router: Router) { 
    this.feed = [];
    this.afAuth.onAuthStateChanged(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
    console.log("feed initializing..");
    
    this.retrieveMessages();
  }

  retrieveMessages(){

    if (this.user) {
      this.chatService.getMessages().subscribe(messages => this.feed = messages);
    }
  }

  ngOnChanges() {
    this.retrieveMessages();
  }

}
