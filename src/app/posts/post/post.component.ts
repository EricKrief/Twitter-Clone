import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Post } from '../../core/models/post';
import { PostService } from '../../core/services/post.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material';
import { ReplyComponent } from '../../entry/reply/reply.component';
import { ConfirmationComponent } from '../../entry/confirmation/confirmation.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Output() deletePost = new EventEmitter<string>();
  usernameSubscription: Subscription;
  loggedInUsername: string;
  test: Observable<Post>;


  constructor(private postService: PostService, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.usernameSubscription = this.authService.loggedInUsername.subscribe(
      username => this.loggedInUsername = username
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReplyComponent, {
      data: this.post
    });
    dialogRef.afterClosed().subscribe(
      replyMessage => {
        if (replyMessage) {
          this.postService.addPost(replyMessage);
        }
      });
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
  }

  toggleStar(): void {
    if (this.loggedInUsername) {
      this.postService.toggleStar(this.post._id).subscribe(
        response => {
          this.post.stars = response.stars;
          this.post.starredByMe = response.starredByMe;
        }
      );
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.postService.deletePost(this.post._id);
          this.deletePost.emit(this.post._id);
        }
      });
  }

  goToProfile(): void {
    this.router.navigate([`profile/${this.post.username}`]);
  }

}
