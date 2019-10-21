import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginResponse, RegisterResponse } from '../models/api-respones';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private accessToken: string = '';
    private _loggedInUsername = new BehaviorSubject<string>(undefined);
    public readonly loggedInUsername = this._loggedInUsername.asObservable();
    private _registerErrorMessage = new Subject<string>();
    public readonly registerErrorMessage = this._registerErrorMessage.asObservable();

    constructor(private http: HttpClient) { }

    login(email: string, password: string):void {
        const userCredentials = { email: email, password: password };
        const url = 'http://localhost:3000/api/auth/login';
        this.http.post<LoginResponse>(url, userCredentials).subscribe(
            response => {
                this.accessToken = response.token;
                this._loggedInUsername.next(response.username);
            },
            error => this._loggedInUsername.next(undefined)
        );
    }

    register(email: string, password: string, username: string):void {
        const userCredentials = { email: email, password: password, username: username };
        const url = 'http://localhost:3000/api/auth/register';
        this.http.post<RegisterResponse>(url, userCredentials).subscribe(
            response => {
                this.accessToken = response.token;
                this._loggedInUsername.next(response.user.username);
                this._registerErrorMessage.next(undefined);
            },
            error => this._registerErrorMessage.next(error.error)
        );
    }

    logout():void {
        this.accessToken = '';
        this._loggedInUsername.next(undefined);
    }


    getToken():string {
        return this.accessToken;
    }

    getLoggedInUsername():string {
        return this._loggedInUsername.value;
    }
}