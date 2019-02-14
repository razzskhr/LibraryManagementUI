import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator,MatTableDataSource,MatSort,MatSortable,MatDialog,MatDialogConfig} from '@angular/material';
import{BookService} from "../services/book.service";
import{Book} from "../model/book.model";
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { CreatebookdataComponent } from './../createbookdata/createbookdata.component';
import { AuthenticationService } from '../services/authenticationService';
import {ConfigurationService} from  '../services/configurationService';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig] 
})
export class HomeComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  dataSource : MatTableDataSource<any>;
  searchKey : string;
  displayedColumns: string[] ;
  items;
  nameChecked : false;
  authorChecked : false;
  books : Book[] = [];
  errorMessage : string;
  result ;
  constructor(private config: NgbCarouselConfig,private bookservice : BookService, private router :
     Router,private dialog:MatDialog, private authService : AuthenticationService, private configService : ConfigurationService) {
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit() {
  this.displayedColumns = [ 'Image','Name','Author', 'AvailableCopies', 'BlockedCopies','actions'];
  this.configService.getConfigDetails().subscribe(details => this.result = details,error => this.errorMessage = <any>error );


  this.bookservice.getBooks().subscribe(
    booklist => {
      this.books = booklist;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.paginator = this.paginator;
      console.log(this.books);
      console.log(booklist);
    },
    error => this.errorMessage = <any>error
  );

 
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

  deleteBook(book : Book)
  {
this.bookservice.deleteBook(book).subscribe(
  data => {
    if(data){
      const i = this.books.findIndex(e=>e.Id===book.Id);
    if(i!== -1){
    this.books.splice(i,1);
    this.dataSource = new MatTableDataSource(this.books);
    }
    }
  }
)
  }

//   CreateBook()
// {
//   this.router.navigate(['/createBooks'])
// }

CreateBook()
  {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    ////sessionStorage.setItem('ListOfBooks',this.dataSource);
    this.dialog.open(CreatebookdataComponent,dialogConfig);
  }

}
