import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { BookService} from '../services/book.service';
import{Book} from "../model/book.model";
import{Isbn} from "../model/isbn.model";


@Component({
  selector: 'app-createbookdata',
  templateUrl: './createbookdata.component.html',
  styleUrls: ['./createbookdata.component.css']
})
export class CreatebookdataComponent implements OnInit {
submit=false;
isNewBookAdded=true;
isIncreasedBooks=false;
CreateNewBook:FormGroup;
AddToExistingBooks:FormGroup;
books : Book[] = [];
ISBN : FormGroup;
stopSubmitOnClose : boolean = false;
selectedBook : any;
  constructor(private formBuilder:FormBuilder,private router:Router,private bookService : BookService,
    public dialogRef: MatDialogRef<CreatebookdataComponent>) { }

getBookData()
{
  var elementId = [];
  this.bookService.getBooks().subscribe(
    booklist => {
      this.books = booklist
    //   this.books = booklist.filter(el => {
    //     if (elementId.indexOf(el.Id) === -1) {
    //         elementId.push(el.Id);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
       booklist.forEach(x=>this.books.push(x));
    },
  );
}

  ngOnInit() {
    this.getBookData();
    this.CreateNewBook=this.formBuilder.group(
      {
        Name:['',Validators.required],
        Author:['',Validators.required],
        PublishingYear:['',Validators.required],
        ISBNNumber : this.formBuilder.array([
          this.AddISBN()
         ])
      }
    );
    
    this.AddToExistingBooks=this.formBuilder.group(
      {
        ////book:['',Validators.required],
        ////Id:['',Validators.required],
        ISBNNumber : this.formBuilder.array([
          this.AddISBN()
         ])
      });
  }

  AddISBN() : FormGroup{
   return this.formBuilder.group(
      {
      TrackNo:['',Validators.required],
      Edition:['',Validators.required],
      });
  }
  onSubmit()
  {
    if(this.stopSubmitOnClose)
    {
      this.stopSubmitOnClose = false;
      return;
    }
    this.submit=true;
    this.bookService.postBook(this.CreateNewBook.value).subscribe(
      data => 
      {
        if(data)
        {
          console.log("add success")
          this.dialogRef.close();
        }
        
      }
    );
  }
  onExistingSubmit()
  {
    if(this.stopSubmitOnClose)
    {
      this.stopSubmitOnClose = false;
      return;
    }
    console.log(this.selectedBook);
    this.bookService.postExistingBook(this.AddToExistingBooks.value,this.selectedBook).subscribe(
      data => console.log(data)
    );
  }
   initializeCreateNewBook() {
     this.CreateNewBook.setValue({
       Name: '',
       Author: '',
       ISBNNumber : [{"TrackNo" : "","Edition" : ""}],
       PublishingYear: '',
     });
   }
  initializeAddToExistingBooksGroup() {
    this.AddToExistingBooks.setValue({
      ////book: '',
      ////Id: '',
      ISBNNumber : [{"TrackNo" : "","Edition" : ""}],
    });
  }
  onClose()
  {
    this.stopSubmitOnClose = true;
    if(this.isNewBookAdded)
    {
      this.CreateNewBook.reset();
      this.initializeCreateNewBook();
      this.dialogRef.close();
    }
    else if(this.isIncreasedBooks)
    {
      this.AddToExistingBooks.reset();
      this.initializeAddToExistingBooksGroup();
      this.dialogRef.close();
    }
    
  }
  AddNew()
  {
   this.isNewBookAdded=true;
   this.isIncreasedBooks=false;

  }
  AddExisting()
  {
    console.log(this.books);
    this.isNewBookAdded=false;
  this.isIncreasedBooks=true;
  }
  LoginPage()
  {
    this.router.navigate(['/login']);
  }
}
