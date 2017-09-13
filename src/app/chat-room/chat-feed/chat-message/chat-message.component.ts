import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { Message } from './../../../shared/models/message';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit, OnDestroy {

  @Input() message: Message;

  subscription: Subscription;

  currentEmail: string;
  userEmail: string;
  ownMessage: boolean;

  user: Observable<firebase.User>;

  constructor(
    private auth: AuthService
  ) {
      this.user = auth.currentUserObservable.take(1);
      this.subscription = this.user.subscribe(
        (value) => {
          this.userEmail = value.email;
          this.ownMessage = this.userEmail === this.currentEmail;
      });
   }

  ngOnInit(message = this.message) {
    this.currentEmail = message.email;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
