import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit, OnDestroy {

  replyMessage: string;
  numberOfChars = 0;
  maximumNumberOfChars = 240;
  replyTitleEN = `Reply to ${this.post.username}'s post`;
  replyTitleES = `Responder a la publicación de ${this.post.username}`;
  currentLanguage: string;
  languageSubscription: Subscription;
  isInitialLoad: boolean;
  initialLoadSubscription: Subscription;


  constructor(private dialogRef: MatDialogRef<ReplyComponent>,
    @Inject(MAT_DIALOG_DATA) private post: any,
    private translationService: TranslationService) { }

  ngOnInit() {
    this.languageSubscription = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    );
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )

  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onReply(): void {
    this.dialogRef.close(this.replyMessage);
  }

  updateNumberOfChars(): void {
    this.numberOfChars = this.replyMessage.length;
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.initialLoadSubscription.unsubscribe();
  }

}
