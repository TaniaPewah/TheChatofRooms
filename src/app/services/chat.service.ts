import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbPath = '/chat-messages';
  user!: firebase.default.User;
  users: AngularFirestoreCollection<User>;
  chatCollection!: AngularFirestoreCollection<ChatMessage>;
  chatMessages!: Observable<ChatMessage[]>;
  chatMessage: ChatMessage= {};
  userName: string ='';
  email: string ='';
  now!: Date;

  constructor( private firestore: AngularFirestore,
               private afAuth: AngularFireAuth,
               private router: Router) { 

    this.afAuth.onAuthStateChanged(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;

        this.chatCollection = this.firestore.collection(this.dbPath, ref => ref.orderBy('timeSent', 'asc'));
        this.chatMessages = this.chatCollection.valueChanges();

        this.getLoggedInUser();
      } else {
        this.router.navigate(['login']);
      }
    });
    
    this.users = this.firestore.collection('/users');
   

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
    this.chatCollection.add({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    });
  }

  getTimeStamp() {
    return this.now = new Date();
  }

  startTyping(){
    console.log('typing');
  }

  endTyping(){
    console.log('not typing');
  }
}
