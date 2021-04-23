import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {firebase} from '@firebase/app';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbPath = '/chat-messages';
  user!: firebase.default.User;

  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessage: ChatMessage= {};
  userName: string ='';
  email: string ='';

  constructor( private firestore: AngularFirestore,
               private afAuth: AngularFireAuth) { 

    this.chatMessages = firestore.collection(this.dbPath);
    this.getLoggedInUser();

  }

  async getLoggedInUser() {
    const user = await this.isLoggedIn()
    if (user) {
      this.user = user;
      debugger;
    } else {
     
    }
  }

  getUsers() {
    const path = '/users';
    return this.firestore.collection(path);
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getMessages(){
    console.log("calling get messages");
    return this.chatMessages;
  }


  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = this.user.email!;
    this.chatMessages = this.firestore.collection(this.dbPath);
    this.chatMessages.add({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email 
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
