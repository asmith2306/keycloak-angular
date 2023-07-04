import {Component, OnInit} from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult
} from 'angular-auth-oidc-client';
import {delay, filter, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  authenticated = this.oidcSecurityService.isAuthenticated$;
  userData = this.oidcSecurityService.userData$;

  constructor(private router: Router,
              private oidcSecurityService: OidcSecurityService,
              private snackBar: MatSnackBar) {
    console.log('in constructor')
  }

  ngOnInit(): void {
    console.log('in init')
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe((result) => {
        // Go to /home if logged in
        this.snackBar.open('Successfully logged out', undefined, {duration: 5000});
        this.router.navigate(['/home']);
        console.log(result)
      });
  }

}
