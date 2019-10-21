import { NgModule } from '@angular/core';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        CreatePostComponent,
        PostComponent,
        PostListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule
    ],
    exports:[
        PostListComponent,
        CreatePostComponent
    ]
})
export class PostsModule {

}