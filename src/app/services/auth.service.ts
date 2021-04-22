import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import '@firebase/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User> = new Observable();
  private authState: any;
  public userData: any;

  constructor(public afs: AngularFirestore,   // Inject Firestore service
              public afAuth: AngularFireAuth, // Inject Firebase auth service
              public router: Router,  ) { }

  get currentUserID(): string{
    return this.authState !== null ? this.authState.uid : '';
  }

  getUser(){
    return this.user$;
  }

  // Sign up with email/password
  signUp(email:string, password:string, displayName:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.authState = result.user;
        const status = 'online';
        this.setUserData(result.user, displayName);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((resolve =>{
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      }))
  }


  setUserData( user:any, displayName: string ){
    const path = `users/${this.currentUserID}`;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(path);
    this.userData = {
      uid: this.currentUserID,
      email: user.email,
      displayName: displayName
    }

    return userRef.set(this.userData,{
      merge: true
    }). catch(error => console.log(error));

  }

  setUserStatus(status:string){
    const path = `users/${this.currentUserID}`;
    const data = {
      status: status
    }
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }
}
