import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import { AppComponent }   from './app.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './shared/user/user.service';
import { AuthGuard } from './auth-guard.service';
import { ToDoService } from './shared/to-do/to-do.service';

@NgModule({
    declarations: [
        AppComponent,
        ToDosComponent,
        LoginComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        UserService,
        ToDoService,
        AuthGuard,
        HTTP_PROVIDERS,
        APP_ROUTER_PROVIDERS,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
