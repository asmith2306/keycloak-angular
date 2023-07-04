import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult
} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  configuration$: Observable<OpenIdConfiguration>;
  userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$: Observable<UserDataResult>;
  isAuthenticated = false;

  constructor(public oidcSecurityService: OidcSecurityService,
              private router: Router) {
  }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({isAuthenticated, userData, accessToken, idToken}) => {
        // console.log('app authenticated', isAuthenticated);
        // console.log(`Current access token is '${accessToken}'`);
        // console.log(`Current id token is '${idToken}'`);
        localStorage.setItem('guiAccessToken', accessToken);
        localStorage.setItem('guiIdToken', idToken);

        if(isAuthenticated){
          this.router.navigate(['/home']);
        }
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

}
