import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { containsCapitalLetterValidator, containsNumberValidator } from '../../core/utils/custom-validators';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  initialLoadSubscription: Subscription;
  languageSubscription: Subscription;
  isInitialLoad: boolean;
  currentLanguage: string;
  registerForm: FormGroup;
  registerErrorMessageSubscription: Subscription;
  registerErrorMessage: string;
  emailErrorMessage = 'You must enter a valid email';
  usernameErrorMessage = 'You must enter a username';
  passwordErrorMessage = 'You must enter a password';

  constructor(private authService: AuthService, private translationService: TranslationService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), containsCapitalLetterValidator, containsNumberValidator])
    });
    this.languageSubscription = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    )
    //If this is the first time loading our app, then we don't want to use translation pipe.
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )
    //Register was successful, navigate to home page.
    this.registerErrorMessageSubscription = this.authService.registerErrorMessage.subscribe(errorMessage => {
      if (!errorMessage) {
        this.router.navigate(['/']);
      }
      //Register was unsuccessful, show error message for 3 seconds.
      else {
        this.registerErrorMessage = errorMessage
        setTimeout(() => {
          this.registerErrorMessage = undefined
        }, 3000);
      }
    });
  }


  onSubmit(): void {
    this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.username);
  }

  ngOnDestroy(): void {
    this.initialLoadSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
    this.registerErrorMessageSubscription.unsubscribe();
  }

}
