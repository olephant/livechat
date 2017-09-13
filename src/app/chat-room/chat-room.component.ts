import { UsersService } from './../shared/services/users.service';
import { AuthService } from './../shared/services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  welcomeMessage: string;

  constructor(
    private auth: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    // current users profile add to subject so we can access it everywhere
    this.subscription = this.usersService.getUser(this.auth.currentUserId).subscribe(
      (user) => {
        this.welcomeMessage = 'Welcome ' + user.name;
        this.usersService.userDetails.next(user);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // remove message when logged out
    this.welcomeMessage = '';
  }

}
