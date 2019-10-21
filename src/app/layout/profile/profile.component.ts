import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;
  initialLoadSubscription: Subscription;
  languageSubscription: Subscription;
  isInitialLoad: boolean;
  currentLanguage: string;

  constructor(private userService: UserService, private translationService: TranslationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    )
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )
    this.userSubscription = this.userService.getUserByUsername(this.route.snapshot.params['username']).subscribe(
      user => this.user = user
    )
  }



  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.initialLoadSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

}
