import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = String(localStorage.getItem('guiAccessToken'));

    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    return next.handle(request);
  }
}
