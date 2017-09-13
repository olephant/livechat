import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;

    haveErrors: boolean;
    error: string;
    spinner: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.subscription = this.auth.firebaseError.subscribe(
      (errorMsg) => this.handleErrors(errorMsg)
    );
  }

  onSubmit(form: NgForm) {
    this.haveErrors = false;
    this.spinner = true;
    this.auth.emailLogin(form.value.email, form.value.password);
   }

  handleErrors(errorMsg) {
    this.haveErrors = true;
    this.error = errorMsg;
    this.spinner = false;
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

}
