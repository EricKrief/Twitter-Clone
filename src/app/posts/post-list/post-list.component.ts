import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../../core/models/post';
import { PostService } from '../../core/services/post.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() user: User;
  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    if (this.user) {
      this.postsSubscription = this.postService.getUserPosts(this.user._id).subscribe(
        posts => this.posts = posts.reverse()
      )
    }
    else {
      this.postsSubscription = this.postService.posts.subscribe(
        posts => this.posts = posts
      )
    }
  }

  deletePost(post: Post): void {
    let counter = 0;
    this.posts.forEach(p => {
      if (p._id === post._id) {
        this.posts.splice(counter, 1);
      }
      counter++;
    });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
