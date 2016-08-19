import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from './shared/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [ROUTER_DIRECTIVES],
})
export class AppComponent {

    public userService: UserService;

    constructor(us: UserService) {
        this.userService = us;
    }
}