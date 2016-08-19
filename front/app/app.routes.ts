import { provideRouter, RouterConfig } from '@angular/router';

import { ToDosRoutes } from './to-dos/to-dos.routes';
import { LoginRoutes } from './login/login.routes';
import { AuthGuard } from './auth-guard.service'

const routes: RouterConfig = [
    ...ToDosRoutes,
    ...LoginRoutes,
];

const authProviders = [AuthGuard];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    authProviders
];