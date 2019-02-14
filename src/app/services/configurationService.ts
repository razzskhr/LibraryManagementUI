import { Injectable }   from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse, HttpEvent }   from '@angular/common/http';
import {tap, catchError, map} from 'rxjs/operators';
import {AdminConfiguration} from '../model/adminConfiguration.model';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigurationService
{
    private serviceUrl = 'https://librarymanagement20190208054654.azurewebsites.net/api/config';
    private handleError;

    constructor(private http: HttpClient)
    {

    }

    getConfigDetails() {
        return this.http.get(this.serviceUrl).pipe(

            tap(data => 
                console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
    }
}