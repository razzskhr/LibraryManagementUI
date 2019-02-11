import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
////import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import { Book } from '../model/book.model';

@Injectable()
export class UserService {

  private serviceUrl = 'https://librarymanagement20190208054654.azurewebsites.net/api/books';
  
  constructor(private http: HttpClient) { }
  
   getBooks(): Observable<Book[]> {
     return this.http.get<Book[]>(this.serviceUrl);
  }
  
}