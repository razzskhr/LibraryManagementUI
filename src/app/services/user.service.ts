import { Injectable }   from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse, HttpEvent }   from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';

import { Book } from '../model/book.model';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class UserService {

  private serviceUrl = 'https://librarymanagement20190208054654.azurewebsites.net/api/books';
  private handleError;
  
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
      return this.http.get<Book[]>(this.serviceUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

  deleteBook(book : Book) : boolean
  {
    return true;
  }

  addNewBook()
  {
      
  }

  addExistingBook()
  {

  }

}