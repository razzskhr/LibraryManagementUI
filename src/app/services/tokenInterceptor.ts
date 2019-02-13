import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import { AuthenticationService } from './authenticationService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
     if (request.headers.get('No-Auth') == "True")
         return next.handle(request.clone());

    if (this.auth.getToken() != null) {
        const clonedreq = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + this.auth.getToken())
        });
        return next.handle(clonedreq).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        console.log('event--->>>', event);
                    }
                    return event;
                }));
    }
    else {
        this.router.navigateByUrl('/login');
    }
    // const token: string = localStorage.getItem("accessToken");

    // if (token) {
    //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }
    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }
    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    // return next.handle(request).pipe(
    //     map((event: HttpEvent<any>) => {
    //         if (event instanceof HttpResponse) {
    //             console.log('event--->>>', event);
    //         }
    //         return event;
    //     }));
}
}