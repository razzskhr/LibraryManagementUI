import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator,MatTableDataSource,MatSort,MatSortable} from '@angular/material';
import{UserService} from "../services/book.service";
import{Book} from "../model/book.model";
import {Observable} from 'rxjs';

export interface BookElement {
  image : string;
  name: string;
  author: string;
  description: string;
  available: number;
}

const ELEMENT_DATA: BookElement[] = [
  { image : "https://librarymanagement.blob.core.windows.net/images/79262ed0-10e5-4bb2-bab4-463f7c39d922",
     name: 'story', author : "ss", description: "", available: 1},
  { image : "https://librarymanagement.blob.core.windows.net/images/79262ed0-10e5-4bb2-bab4-463f7c39d922",
    name: 'abcs', author : "ss", description: "", available: 1},
  { image : "https://librarymanagement.blob.core.windows.net/images/79262ed0-10e5-4bb2-bab4-463f7c39d922", name: 'bookexample', author : "ss", description: "", available: 1},
  { image : "https://librarymanagement.blob.core.windows.net/images/79262ed0-10e5-4bb2-bab4-463f7c39d922", name: 'test', author : "ss", description: "", available: 1},
  { image : "https://librarymanagement.blob.core.windows.net/images/79262ed0-10e5-4bb2-bab4-463f7c39d922", name: 'data', author : "ss", description: "", available: 1},
  { image : "https://librarymanagement.blob.core.windows.net/images/79262ed0-10e5-4bb2-bab4-463f7c39d922", name: 'physics', author : "ss", description: "", available: 1},
  { image : "", name: 'chemistry', author : "ss", description: "", available: 1},
  { image : "", name: 'EDC', author : "ss", description: "", available: 1},
  { image : "", name: 'BEE', author : "ss", description: "", available: 1},
  { image : "", name: 'Drawing', author : "ss", description: "", available: 1},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig] 
})
export class HomeComponent implements OnInit {

  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  ////@ViewChild(MatSort) sort : MatSort;
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  dataSource : MatTableDataSource<any>;
  searchKey : string;
  displayedColumns: string[] ;
  items;
  nameChecked : false;
  authorChecked : false;
  books : Book[];
  constructor(private config: NgbCarouselConfig,private usersservice : UserService) {
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit() {
  this.displayedColumns = [ 'image','name','author', 'description', 'available'];
  this.usersservice.getBooks()
      .subscribe(heroes => this.books = heroes);
  ////this.books = this.usersservice.getBooks();
  this.dataSource = new MatTableDataSource(this.books);
  ////this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  this.dataSource.paginator = this.paginator;
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
checkval :  boolean = false;
  nameClick()
  {
    this.checkval = this.nameChecked;
  }
  authorClick()
  {

  }
  onChange()
  {

  }

}
