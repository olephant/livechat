import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
         CanActivate,
         Router,
         RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthenticateGuard implements CanActivate {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
                this.user = afAuth.authState;
                }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
      Observable<boolean> | Promise<boolean> | boolean {

      return this.user.map(
        (auth) => {
          if (!auth) {
            this.router.navigateByUrl('/login');
            return false;
          }
            return true;
        }).take(1);
  }
}



