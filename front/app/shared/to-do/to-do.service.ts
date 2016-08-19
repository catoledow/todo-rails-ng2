import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { HOST } from '../config/host';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ToDoService {

    public userToken: string;
    public userId: number;

    constructor(private http: Http) {
    }

    public create(content: string) {
        let body = "task[content]=" + content + "&task[completed]=0";

        let headers = this.createHeaders();

        return this.http.post(this.getBaseUrl(), body, {headers: headers})
            .toPromise()
            .then(resp => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    public update(id: number, content: string, completed: boolean) {
        let body = "task[content]=" + content + "&task[completed]=" + completed;

        let headers = this.createHeaders();

        return this.http.put(this.getBaseUrl() + id, body, {headers: headers})
            .toPromise()
            .then(resp => {
                return resp.json();
            })
            .catch(this.handleError);
    }

    public delete(id: number) {

        let headers = new Headers();
        headers.append('Authorization', this.userToken);

        return this.http.delete(this.getBaseUrl() + id, {headers: headers})
            .toPromise()
            .then(() => {
                return true;
            })
            .catch(this.handleError);
    }

    private getBaseUrl() {
        return HOST + 'users/' + this.userId + '/tasks/';
    }

    private createHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', this.userToken);

        return headers;
    }

    private handleError(error: any) {
        return false
    }

}