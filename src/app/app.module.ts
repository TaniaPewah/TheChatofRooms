import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomGeneralComponent } from './chatroom-general/chatroom-general.component';
import { ChatroomProfessionalComponent } from './chatroom-professional/chatroom-professional.component';
import { ChatroomMasteryComponent } from './chatroom-mastery/chatroom-mastery.component';
import { RoomFeedComponent } from './room-feed/room-feed.component';
import { MessageComponent } from './message/message.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ChatRoomsListComponent } from './chat-rooms-list/chat-rooms-list.component';

import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';

import { appRoutes } from 'src/routes';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomGeneralComponent,
    ChatroomProfessionalComponent,
    ChatroomMasteryComponent,
    RoomFeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    ChatRoomsListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [ AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
