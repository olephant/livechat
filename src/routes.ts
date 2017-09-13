import { LoginComponent } from './app/login/login.component';
import { AuthenticateGuard } from './app/shared/guards/authenticate.guard';
import { RegisterDetailsComponent } from './app/register/register-details/register-details.component';
import { RegisterComponent } from './app/register/register.component';
import { ChatRoomComponent } from './app/chat-room/chat-room.component';

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path : '', redirectTo : '/login', pathMatch : 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'chat', canActivate: [AuthenticateGuard], component: ChatRoomComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register/profile', canActivate: [AuthenticateGuard], component: RegisterDetailsComponent }
];
