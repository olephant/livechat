import { User } from './../../shared/models/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  users: FirebaseListObservable<User[]>;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.users = this.usersService.getAllUsers({orderByChild: 'status' });
  }

}
