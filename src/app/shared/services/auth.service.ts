import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()

export class AuthService {

  authState: any = null;

  // track firebase errors that require user display
  firebaseError = new Subject<string>();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
      this.afAuth.authState.subscribe((auth) => {
      this.authState = auth; });
    }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }


  emailSignUp(email: string, password: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user;
      this.updateUserData();
    })
    .catch(error => this.firebaseError.next(error.message));
  }

  private updateUserData(): void {
    // Endpoint firebase
    const path = `users/${this.currentUserId}`;

    // add some default values for name and avitar
    // incase user does not complete the next section
    const data = {
      email: this.authState.email,
      name: 'Guest',
      // tslint:disable-next-line:max-line-length
      avatar: 'https://firebasestorage.googleapis.com/v0/b/livechat-9ccb0.appspot.com/o/profile%2Fprofile-pictures.png?alt=media&token=45b5b00e-0b85-4a5d-a3b2-9444e261137d', // set it to a default image
      status: true
    };

    // after updating user info navigate to the profile page where
    // user add displayname and avitar
    this.db.object(path).update(data)
      .then(() => this.router.navigate(['register', 'profile']))
      .catch(error => console.log(error.message, ' Add new user error'));
  } // updateUserData

  emailLogin(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user;
      this.setStatus(true);
      this.router.navigate(['chat']);
    })
    .catch(error => this.firebaseError.next(error.message));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.setStatus(false);
    this.router.navigate(['/login']);
  }

  private setStatus(status: boolean): void {
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = { status : status };
    this.db.object(path).update(data).catch(error => console.log(error, ' setting status on login/out'));
  }

}
