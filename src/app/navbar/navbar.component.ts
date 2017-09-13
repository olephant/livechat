import { MessageService } from './../shared/services/message.service';
import { Message } from './../shared/models/message';
import { Subscription } from 'rxjs/Rx';
import { UsersService } from './../shared/services/users.service';
import { AuthService } from './../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;

  toggleMenu: boolean;

  currentUser: Observable<firebase.User>;

  message: Message = new Message();
  email: string;
  name: string;
  avatar: string;

  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUserObservable;

    this.subscription = this.usersService.userDetails.subscribe(
      (profile) => {
        this.email = profile.email;
        this.name = profile.name;
        this.avatar = profile.avatar;
      }
    );
  }

  // toggle mobile menu
  onToggle() {
    this.toggleMenu = !this.toggleMenu;
  }

  // send left coversation
  signOut() {
    this.message.body = this.name + ' has signed out';
    this.message.email = this.email;
    this.message.name = this.name;
    this.message.avatar = this.avatar;
    this.messageService.createItem(this.message);
    this.message = new Message();
    this.auth.signOut();
  }

}
