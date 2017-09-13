import { User } from './../../../shared/models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
