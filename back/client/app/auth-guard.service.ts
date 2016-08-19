import { Injectable }            from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }   from '@angular/router';

import { UserService }           from './shared/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private userService: UserService;
    private router: Router;

    constructor(us: UserService, r: Router) {
        this.userService = us;
        this.router = r;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['']);

        return false;
    }
}