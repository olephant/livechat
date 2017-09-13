import { Subscription } from 'rxjs/Rx';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  haveErrors: boolean;
  // error message from firebase
  error: string;
  spinner: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // subscribe to subject incase of firebase errors
    this.subscription = this.auth.firebaseError.subscribe(
      (errorMessage) => this.handleErrors(errorMessage)
    );
  }

  onSubmit(form: NgForm) {
    // if we had previous errors hide them
    this.haveErrors = false;
    // display spinner
    this.spinner = true;
    this.auth.emailSignUp(form.value.email, form.value.password);
   }

   handleErrors(errorMessage) {
     // show error message
    this.haveErrors = true;
    // set message
    this.error = errorMessage;
    // remove spinner
    this.spinner = false;
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

}
