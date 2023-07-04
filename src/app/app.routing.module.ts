import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthorizedComponent} from "./authorized/authorized.component";
import {AuthorizationGuard} from "./guard/authorization.guard";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthorizationGuard]},
  {path: 'authorized', component: AuthorizedComponent, canActivate: [AuthorizationGuard]},
  {path: 'forbidden', component: UnauthorizedComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
