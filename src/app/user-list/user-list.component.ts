import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User } from "../models/user.model";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  constructor(chatService: ChatService) {
    // chatService.getUsers().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.users = data;
    // });

    chatService.getUsers().valueChanges().subscribe( users =>{
      this.users = users;
    });

  }
}