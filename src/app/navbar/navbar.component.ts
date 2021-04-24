import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: Observable<firebase.default.User>;
  userEmail: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("hereeeee");
    this.user = this.authService.authUser();
    this.user.subscribe((user) => {
      if (user) {
        this.userEmail = user.email!;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  login(){
   
  }

}
