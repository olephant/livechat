import { MessageService } from './../shared/services/message.service';
import { UsersService } from './../shared/services/users.service';
import { AuthService } from './../shared/services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy, AfterContentInit{

  subscription: Subscription;
  welcomeMessage: string;

  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // current users profile add to subject so we can access it everywhere
    this.subscription = this.usersService.getUser(this.auth.currentUserId).subscribe(
      (user) => {
        this.welcomeMessage = 'Welcome ' + user.name;
        this.usersService.userDetails.next(user);
      }
    );

    this.messageService.newMessage.subscribe(
      (msg) =>  {
        setTimeout( () => {
          this.scroller();
        }, 1  );
      }
    );
  }

  ngAfterContentInit() {
    this.messageService.newMessage.subscribe(
      (msg) =>  this.scroller()
    );
  }


  scroller() {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // remove message when logged out
    this.welcomeMessage = '';
  }

}
