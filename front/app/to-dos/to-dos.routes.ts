import { RouterConfig } from '@angular/router';

import { ToDosComponent } from './to-dos.component';
import { AuthGuard } from '../auth-guard.service'

export const ToDosRoutes: RouterConfig = [
    {
        path: 'todos',
        component: ToDosComponent,
        canActivate: [AuthGuard]
    }
];