import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
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
  users: AngularFirestoreCollection<User>
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessage: ChatMessage= {};
  userName: string ='';
  email: string ='';

  constructor( private firestore: AngularFirestore,
               private afAuth: AngularFireAuth) { 

    this.chatMessages = firestore.collection(this.dbPath);
    this.users = this.firestore.collection('/users');
    this.getLoggedInUser();

  }

  async getLoggedInUser() {
    const user = await this.isLoggedIn()
    if (user) {
      this.user = user;
      this.getUser().subscribe(( data: any) => {
        this.userName =data.exists ? data.data().displayName : undefined;
        console.log(this.userName);
      });

    } else {
     console.log("error getting logged-in user from firestore");
    }
  }

  getUsers() {
    console.log("calling get users");
    return this.users;
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.firestore.doc(path).get();
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
