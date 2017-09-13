import { AuthService } from './../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggleMenu: boolean;

  currentUser: Observable<firebase.User>;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUserObservable;
  }

  // toggle mobile menu
  onToggle() {
    this.toggleMenu = !this.toggleMenu;
  }

  // send left coversation
  signOut() {
    this.auth.signOut();
  }

}
