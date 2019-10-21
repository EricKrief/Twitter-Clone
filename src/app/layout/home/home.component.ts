import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  loggedInUsername: string;
  usernameSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usernameSubscription = this.authService.loggedInUsername.subscribe(
      username => this.loggedInUsername = username
    )
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
  }

}
