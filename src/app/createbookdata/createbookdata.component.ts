import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { BookService} from '../services/book.service';
import { isBoolean } from 'util';
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
isImageUploaded=false;
CreateNewBook:FormGroup;
AddToExistingBooks:FormGroup;
books : Book[] = [];
ISBN : FormGroup;
url :any;

stopSubmitOnClose : boolean = false;
  constructor(private formBuilder:FormBuilder,private router:Router,private bookService : BookService,
    public dialogRef: MatDialogRef<CreatebookdataComponent>) { }

getBookData()
{
  this.bookService.getBooks().subscribe(
    booklist => {
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
        Name:['',Validators.required],
        ISBNNumber : this.formBuilder.array([
          this.AddISBN()
         ])
      });
  }

  AddISBN() : FormGroup{
   return this.formBuilder.group(
      {
      id:['',Validators.required],
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
      data => console.log(data)
    );
  }
  onExistingSubmit()
  {
    if(this.stopSubmitOnClose)
    {
      this.stopSubmitOnClose = false;
      return;
    }
    this.bookService.postExistingBook(this.AddToExistingBooks.value).subscribe(
      data => console.log(data)
    );
  }
   initializeCreateNewBook() {
     this.CreateNewBook.setValue({
       Name: '',
       Author: '',
       ISBNNumber : [{"id" : "","Edition" : ""}],
       PublishingYear: '',
     });
   }
  initializeAddToExistingBooksGroup() {
    this.AddToExistingBooks.setValue({
      bookName: '',
      ISBNNumber : [{"id" : "","Edition" : ""}],
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
  UploadImage(event)
  {
    this.isImageUploaded=true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
    console.log(event);
  }
}
