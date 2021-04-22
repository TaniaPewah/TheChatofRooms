import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-room-feed',
  templateUrl: './room-feed.component.html',
  styleUrls: ['./room-feed.component.css']
})
export class RoomFeedComponent implements OnInit {

  feed: ChatMessage[];
  constructor(private chatService: ChatService) { 
    this.feed = [];
  }

  ngOnInit() {
    console.log("feed initializing..");
    this.retrieveMessages();
  }

  retrieveMessages(){

    this.chatService.getMessages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.feed = data;
    });
  }

}
