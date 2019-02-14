import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {User} from '../model/user.model'
import {Login} from '../model/login.model'

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
private handleError;
    xyz = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {
        
     }

    login(login : Login) {
        let getHeaders = new HttpHeaders({
            'Content-Type': 'text/plain',
            'No-Auth' : 'True',
        });
        let body = "username=" + login.UserName + "&password=" + login.Password + "&grant_type=" + "password";
        return this.http.post<any>('https://librarymanagement20190208054654.azurewebsites.net/token', body, { headers: getHeaders })
        .pipe(map(user => {
            if (user && user.access_token) {
                localStorage.setItem('accessToken', user.access_token);
            }
            return true;
        }));

        
        
    }

    GetCurrentUser() {
        let getHeaders = new HttpHeaders({
            'Content-Type': 'text/plain',
        });
        return this.http.get<any>('https://librarymanagement20190208054654.azurewebsites.net/api/GetUserClaims')
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user))
                    return true;
                }
            }));
    }

    registration(user : User){
        let getHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'No-Auth' : 'True',
        });
        return this.http.post('https://librarymanagement20190208054654.azurewebsites.net/api/Registration',user, { headers: getHeaders })
        .pipe(map(res => {
return true;
        }));
        // .pipe(map((res: Response) => {
        //     console.log(res);
        //     if (res) {
        //         if (res.status === 201 || res.status === 200) {
        //             return true
        //         }
        //     }
        // }), catchError(this.handleError));   
    }

    public getToken() : string
    {
      return localStorage.getItem("accessToken");
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
    }
}