import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { ChatroomGeneralComponent } from './app/chatroom-general/chatroom-general.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent},
    { path: 'login', component: LoginFormComponent},
    { path: 'chat', component: ChatroomGeneralComponent},
    { path: '', redirectTo: '/login', pathMatch:'full'},
];