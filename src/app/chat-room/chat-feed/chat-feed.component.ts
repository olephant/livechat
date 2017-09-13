import { Subscription } from 'rxjs/Rx';
import { MessageService } from '../../shared/services/message.service';
import { Message } from './../../shared/models/message';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit, OnDestroy {

  messages: FirebaseListObservable<Message[]>;

  subscription: Subscription;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messages = this.messageService.getItemsList();
    // force afterinit call for scroller
    this.subscription = this.messages.subscribe(
      () => this.messageService.newMessage.next('new mesage')
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
