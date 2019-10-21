import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MenuItem } from '../../core/models/menu-item';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  menuItemsSubscription: Subscription;
  usernameSubscription: Subscription;
  languageSubsciption: Subscription;
  menuItems: MenuItem[];
  loggedInUsername: string;
  currentLanguage: string;
  languages: string[];

  constructor(private dataService: DataService,
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router) { }

  ngOnInit(): void {
    this.languageSubsciption = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    )
    this.menuItemsSubscription = this.dataService.menuItems.subscribe(
      menuItems => this.menuItems = menuItems
    );
    this.usernameSubscription = this.authService.loggedInUsername.subscribe(
      username => this.loggedInUsername = username
    )
    this.languages = this.translationService.getLanguageTitles();
  }

  ngOnDestroy(): void {
    this.menuItemsSubscription.unsubscribe();
    this.usernameSubscription.unsubscribe();
    this.languageSubsciption.unsubscribe();
  }

  wasLogoutClicked(menuItemName: string): void {
    if (menuItemName === 'logout') {
      this.authService.logout();
      this.router.navigate(['login']);
    }
  }

  changeLanguage(language: string): void {
    this.translationService.changeLanguage(language);
  }

}
