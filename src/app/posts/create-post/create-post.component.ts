import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  numberOfChars: number;
  postBody: string;
  initialLoadSubscription: Subscription;
  languageSubscription: Subscription;
  isInitialLoad: boolean;
  currentLanguage: string;
  postPlaceholder = 'Share your thoughts with your friends...';
  maximumNumberOfChars = 240;

  constructor(private postService: PostService, private translationService: TranslationService) { }

  ngOnInit(): void {
    this.postBody = '';
    this.numberOfChars = 0;
    this.languageSubscription = this.translationService.currentLanguage.subscribe(
      language => this.currentLanguage = language
    )
    //If this is the first time loading our app, then we don't want to use translation pipe.
    this.initialLoadSubscription = this.translationService.isInitialLoad.subscribe(
      isInitialLoad => this.isInitialLoad = isInitialLoad
    )
  }

  create(): void {
    this.postService.addPost(this.postBody);
    this.postBody = '';
    this.numberOfChars = 0;
  }

  updateNumberOfChars(): void {
    this.numberOfChars = this.postBody.length;
  }

}
