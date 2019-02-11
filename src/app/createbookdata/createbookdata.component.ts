import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';


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
  constructor(private formBuilder:FormBuilder,private router:Router,public dialogRef: MatDialogRef<CreatebookdataComponent>) { }

  ngOnInit() {
    this.CreateNewBook=this.formBuilder.group(
      {
        bookName:['',Validators.required],
        author:['',Validators.required],
        isbnNumber:['',Validators.required],
        edition:['',Validators.required],
        publishedYear:['',Validators.required]
      }
    );
    this.AddToExistingBooks=this.formBuilder.group(
      {
        bookName:['',Validators.required],
        edition:['',Validators.required],
        isbnNumber:['',Validators.required],
      }
    );
  }
  onSubmit()
  {
    this.submit=true;
  }
  initializeCreateNewBook() {
    this.CreateNewBook.setValue({
      bookName: '',
      author: '',
      isbnNumber: '',
      edition: '',
      publishedYear: '',
    });
  }
  initializeAddToExistingBooksGroup() {
    this.AddToExistingBooks.setValue({
      bookName: '',
      isbnNumber: '',
      edition: ''
    });
  }
  onClose()
  {
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
    this.isNewBookAdded=false;
  this.isIncreasedBooks=true;
  }
  LoginPage()
  {
    this.router.navigate(['/login']);
  }
}
