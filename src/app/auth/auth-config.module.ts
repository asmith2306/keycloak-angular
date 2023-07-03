import {NgModule} from '@angular/core';
import {AuthModule, LogLevel} from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8080',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'keycloak-angular',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        autoUserInfo: false, // this is crucial (get 401 otherwise after login)
        useRefreshToken: true,
        autoCleanStateAfterAuthentication: false,
        historyCleanupOff: true,
        logLevel: LogLevel.Debug,
        authWellknownEndpointUrl: 'http://localhost:8080/realms/my-realm/.well-known/openid-configuration'
      },
    }),
  ],
  providers: [],
  exports: [AuthModule],
})
export class AuthConfigModule {
}
