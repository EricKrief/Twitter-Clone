import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToggleStarResponse } from '../models/api-respones';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    loggedInUsername: string;

    private _posts = new BehaviorSubject<Post[]>([]);
    public readonly posts = this._posts.asObservable();


    constructor(private authService: AuthService, private http: HttpClient) {
        this.getPosts();
        this.authService.loggedInUsername.subscribe(
            username => {
                this.loggedInUsername = username;
                this.getPosts();
            }
        );
    }


    toggleStar(postId: string): Observable<ToggleStarResponse> {
        return this.http.post<ToggleStarResponse>(`http://localhost:3000/api/tweets/${postId}/star-toggle`, {});
    }


    getPosts(): void {
        this.http.get<Post[]>('http://localhost:3000/api/tweets').subscribe(
            posts => this._posts.next(posts.reverse())
        );
    }

    getUserPosts(userId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`http://localhost:3000/api/members/${userId}/tweets`);
    }

    addPost(postBody: string): void {
        this.http.post<Post>('http://localhost:3000/api/tweets', { text: postBody }).subscribe(
            response => {
                const newPostArray = this._posts.value;
                newPostArray.unshift(response);
                this._posts.next(newPostArray);
            }
        );
    }

    deletePost(postId: string): void {
        this.http.delete(`http://localhost:3000/api/tweets/${postId}`).subscribe(respone => {
            const newPostArray = this._posts.value;
            newPostArray.forEach((post, index) => {
                if (post._id === postId) {
                    newPostArray.splice(index, 1);
                    this._posts.next(newPostArray);
                }
            });
        });
    }
}