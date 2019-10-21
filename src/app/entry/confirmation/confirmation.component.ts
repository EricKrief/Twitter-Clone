import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  confirmationMessage = 'Are you sure you want to delete this post?';
  currentLanguage: string;
  languageSubscription: Subscription;
  isInitialLoad: boolean;
  initialLoadSubscription: Subscription;


  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>, private translationService: TranslationService) { }

  ngOnInit() {
    this.languageSubscription = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    );
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
