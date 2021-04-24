import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import '@firebase/auth';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  private user:any ={};
  private authState: any={};

  constructor(public afs: AngularFirestore,   // Inject Firestore service
              public afAuth: AngularFireAuth, // Inject Firebase auth service
              public router: Router,  ) {
                this.user = afAuth.authState;
            }

  currentUserID(): string{
    return this.authState !== null ? this.authState.user.uid : '';
  }

  authUser() {
    return this.user;
  }

  // Sign up with email/password
  signUp(email:string, password:string, displayName:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user =>{
        this.authState = user;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      }))
  }

  setUserData( email:string, displayName: string, status: string ){
    const path = `users/${this.currentUserID()}`;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(path);
    this.userData = {
      email: email,
      displayName: displayName,
      status : status
    }
    userRef.set(this.userData)
        .catch(error => console.log(error));
  }

  setUserStatus(status:string){
    const path = `users/${this.currentUserID()}`;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(path);
    const data = {
      status: status
    }

    return userRef.set(data,{
      merge: true
    }). catch(error => console.log(error));
  }

  logout(){
    this.afAuth.signOut();
    this.setUserStatus('offline');
    this.router.navigate(['login']);
  }
}
