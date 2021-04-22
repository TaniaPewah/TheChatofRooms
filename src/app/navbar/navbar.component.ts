import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: Observable<User>;
  userEmail: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("hereeeee");
    debugger;
    this.user = this.authService.getUser();
   
    this.user.subscribe(user => {
      debugger;
      if (user) {
        this.userEmail = user.email!;
        debugger;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  login(){
    console.log("trying to login");
  }

}
