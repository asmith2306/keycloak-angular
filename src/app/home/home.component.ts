import {Component, OnInit} from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';
import {Observable} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  configuration$: Observable<OpenIdConfiguration>;
  userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$: Observable<UserDataResult>;
  isAuthenticated = false;
  authorizationCode = '';

  constructor(public oidcSecurityService: OidcSecurityService,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);

        if (this.isAuthenticated) {
          console.log(this.activatedRoute.snapshot)
          this.authorizationCode = this.activatedRoute.snapshot.queryParams['code'];
          console.log(this.authorizationCode)
          if (this.authorizationCode)
            localStorage.setItem('authorizationCode', this.authorizationCode);
        }
      }
    );
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    this.oidcSecurityService
      .forceRefreshSession()
      .subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService
      .revokeRefreshToken()
      .subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService
      .revokeAccessToken()
      .subscribe((result) => console.log(result));
  }

  getMessages() {
    this.httpClient.get('http://localhost:9090/messages').subscribe(res=>{
      console.log(res)
    })
  }

  getRoledMessages() {
    this.httpClient.get('http://localhost:9090/messages/read-authorized').subscribe(res=>{
      console.log(res)
    })
  }


}
