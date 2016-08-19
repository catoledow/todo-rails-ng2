import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from './user';
import { HOST } from '../config/host';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    public user: User;

    constructor(private http: Http) {
    }

    public login(email: string, password: string) {
        let body = "session[email]=" + email + "&session[password]=" + password;

        let headers = this.createHeaders();

        return this.http.post(HOST + 'sessions', body, {headers: headers})
            .toPromise()
            .then(resp => {
                let response = resp.json();
                this.user = new User(response);
            })
            .catch(this.handleError);
    }

    public subscribe(email: string, name:string, pass: string) {
        let body = "user[name]=" + name + "&user[email]=" + email + "&user[password]=" + pass;

        let headers = this.createHeaders();

        return this.http.post(HOST + 'users', body, {headers: headers})
            .toPromise()
            .then(resp => {
                let response = resp.json();
                this.user = new User(response);
            })
            .catch(this.handleError);
    }

    public isLoggedIn() {
        return !!this.user;
    }

    private createHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return headers;
    }

    private handleError(error: any) {

        if (error._body) {
            let response = JSON.parse(error._body);
            if (response.message) {
                window.alert(response.message)
            }

            if (response.validation_messages) {
                window.alert(response.validation_messages)
            }
        }

    }

}