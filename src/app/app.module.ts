import { ImageCropperModule } from 'ng2-img-cropper';

import { FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileDropDirective } from './shared/directives/file-drop.directive';
import { ReversePipe } from './shared/pipes/reverse.pipe';
import { RegisterComponent } from './register/register.component';
import { RegisterDetailsComponent } from './register/register-details/register-details.component';
import { LoginComponent } from './login/login.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatFeedComponent } from './chat-room/chat-feed/chat-feed.component';
import { ChatMessageComponent } from './chat-room/chat-feed/chat-message/chat-message.component';
import { ChatFormComponent } from './chat-room/chat-form/chat-form.component';
import { ChatUsersComponent } from './chat-room/chat-users/chat-users.component';
import { ChatUserComponent } from './chat-room/chat-users/chat-user/chat-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDropDirective,
    ReversePipe,
    RegisterComponent,
    RegisterDetailsComponent,
    LoginComponent,
    ChatRoomComponent,
    ChatFeedComponent,
    ChatMessageComponent,
    ChatFormComponent,
    ChatUsersComponent,
    ChatUserComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
