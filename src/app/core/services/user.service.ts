import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private http: HttpClient) { }

    getUserById(userId: string): Observable<User> {
        const url = `http://localhost:3000/api/members/${userId}`;
        return this.http.get<User>(url);
    }

    getUserByUsername(username: string): Observable<User> {
        const url = 'http://localhost:3000/api/members';
        const usernameObject = { username: username };
        return this.http.post<User>(url, usernameObject);
    }


}