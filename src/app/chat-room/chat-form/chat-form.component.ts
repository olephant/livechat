import { MessageService } from './../../shared/services/message.service';
import { UsersService } from './../../shared/services/users.service';
import { Subscription } from 'rxjs/Rx';
import { Message } from './../../shared/models/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: Message = new Message();

  subscription: Subscription;

  email: string;
  name: string;
  avatar: string;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService) { }

  ngOnInit() {
    // get current users details so we can add to message
    this.subscription = this.usersService.userDetails.subscribe(
      (profile) => {
        this.email = profile.email;
        this.name = profile.name;
        this.avatar = profile.avatar;
      }
    );
  }

  sendMessage() {
    // no input
    if (this.message.body === undefined) {
      return;
    }
    this.message.email = this.email;
    this.message.name = this.name;
    this.message.avatar = this.avatar;
    this.messageService.createItem(this.message);
    this.message = new Message();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
