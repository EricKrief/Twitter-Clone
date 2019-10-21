import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() language: string;
  isInitialLoad: boolean;
  initialLoadSubscription: Subscription;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )
  }

  ngOnDestroy(): void {
    this.initialLoadSubscription.unsubscribe();
  }

}
