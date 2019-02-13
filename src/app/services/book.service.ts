import { Injectable }   from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse, HttpEvent }   from '@angular/common/http';
//import 'rxjs/add/operator/catch';
////import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';

import { Book } from '../model/book.model';
import { Isbn } from '../model/isbn.model';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class BookService {

  private serviceUrl = 'https://librarymanagement20190208054654.azurewebsites.net/api/books';
  private serviceUrlForPost = 'https://librarymanagement20190208054654.azurewebsites.net/api/Books/AddNewCategoryBook';
  private handleError;
  
  constructor(private http: HttpClient) { }
  
  //  getBooks(): Observable<Book[]> {
  //    return this.http.get<Book[]>(this.serviceUrl).pipe(map(data => {
  //       console.log(data);
  //       return data;
  //   }));
  //    }

  getBooks(): Observable<Book[]> {
      return this.http.get<Book[]>(this.serviceUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

  deleteBook(book : Book) : any
  {
    return this.http.delete(this.serviceUrl + book.Id).pipe(
            map((res: Response) => {
                if (res) {
                    if (res.status === 201 || res.status === 200) {
                        return true
                    }
                }
            }));
    }
    postBook(book : Book) : any
    {
      return this.http.post(this.serviceUrlForPost,book);
    }

    postExistingBook(isbnItem : Isbn) : any
    {
      return this.http.post(this.serviceUrlForPost,isbnItem);
    }
  
     
            // catchError((error: any) => {
            //     if (error.status === 500) {
            //         return false;
            //     }
            //     else if (error.status === 400) {
            //         return false;
            //     }
            //     else if (error.status === 409) {
            //         return false;
            //     }
            //     else if (error.status === 406) {
            //         return false;
            //     }
            // })
    //  errorHandler(error : HttpErrorResponse){
    //     return Observable.throw(error.message || "")
    // }

}