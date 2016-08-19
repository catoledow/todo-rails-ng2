import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { UserService } from '../shared/user/user.service';
import { ToDoService } from '../shared/to-do/to-do.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styles: ['login.component.css']
})
export class LoginComponent {
    public userService: UserService;
    public toDoService: ToDoService;
    public router: Router;

    public showLogin: boolean;
    public loginEmail: string;
    public loginPass: string;
    public newEmail: string;
    public newName: string;
    public newPass: string;

    constructor(us: UserService, r: Router, ts: ToDoService) {
        this.userService = us;
        this.toDoService = ts;
        this.router = r;
        this.showLogin = true;
    }

    public tryLogin() {
        this.userService.login(this.loginEmail, this.loginPass)
            .then(resp => {
                this.toDosIfLoggedIn();
            });
    }

    public trySubscribe() {
        this.userService.subscribe(this.newEmail, this.newName, this.newPass)
            .then(resp => {
                this.toDosIfLoggedIn();
            });
    }

    private toDosIfLoggedIn() {
        if (this.userService.isLoggedIn()) {
            this.toDoService.userId = this.userService.user.id;
            this.toDoService.userToken = this.userService.user.token;

            this.router.navigate(['todos']);
        }
    }

}