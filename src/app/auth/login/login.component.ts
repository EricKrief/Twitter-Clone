import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private translationService: TranslationService, private router: Router) { }

  incorrectLogin = false;
  loginForm: FormGroup;
  emailErrorMessage = 'You must enter a correct email';
  passwordErrorMessage = 'You must enter a password';
  loginErrorMessage = 'Email or password are incorrect';
  usernameSubscription: Subscription;
  initialLoadSubscription: Subscription;
  languageSubscription: Subscription;
  isInitialLoad: boolean;
  currentLanguage: string;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    });
    this.languageSubscription = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    )
    //If this is the first time loading our app, then we don't want to use translation pipe.
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )
    //Login was successful, navigate to home page.
    this.usernameSubscription = this.authService.loggedInUsername.subscribe(username => {
      if (username) {
        this.router.navigate(['/']);
      }
      //Login was unsuccessful, show error message for 3 seconds.
      else {
        this.incorrectLogin = true;
        setTimeout(() => {
          this.incorrectLogin = false;
        }, 3000);
      }
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
    this.initialLoadSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

}
