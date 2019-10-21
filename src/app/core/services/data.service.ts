import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    loggedInUsername: string;
    loggedOutmenuItems = [{ name: 'home', link: '' }, { name: 'login', link: 'login' }, { name: 'register', link: 'register' }];
    loggedInMenuItems = [{ name: 'home', link: '' }, { name: 'profile', link: 'profile' }, { name: 'logout', link: 'logout' }];
    private _menuItems = new BehaviorSubject(this.loggedOutmenuItems);
    public readonly menuItems = this._menuItems.asObservable();

    constructor(private authService: AuthService) {
        this.authService.loggedInUsername.subscribe(
            username => {
                this.loggedInUsername = username;
                if (username) {
                    this.loggedInMenuItems.find(menuItem => menuItem.name === 'profile').link = `profile/${this.loggedInUsername}`;
                    this.login();
                }
                else {
                    this.logout();
                }

            }
        )
    }


    login(): void {
        this._menuItems.next(this.loggedInMenuItems);
    }

    logout(): void {
        this._menuItems.next(this.loggedOutmenuItems);
    }
}