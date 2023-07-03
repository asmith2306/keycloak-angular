import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthConfigModule} from './auth/auth-config.module';
import {CommonModule} from "@angular/common";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./service/app-http-interceptor.service";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AuthorizedComponent} from './authorized/authorized.component';
import {AuthorizationGuard} from "./guard/authorization.guard";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UnauthorizedComponent,
    AuthorizedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'authorized', component: AuthorizedComponent, canActivate: [AuthorizationGuard]},
      {path: 'forbidden', component: UnauthorizedComponent},
      {path: 'unauthorized', component: UnauthorizedComponent},
    ]),
    AuthConfigModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
