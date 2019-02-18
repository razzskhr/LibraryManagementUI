import { Component, OnInit,ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { BookService} from '../services/book.service';
import{Book} from "../model/book.model";
import{Isbn} from "../model/isbn.model";
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';


@Component({
  selector: 'app-createbookdata',
  templateUrl: './createbookdata.component.html',
  styleUrls: ['./createbookdata.component.css']
})
export class CreatebookdataComponent implements OnInit,AfterViewInit, OnDestroy {
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
public bankCtrl: FormControl = new FormControl();
public bankFilterCtrl: FormControl = new FormControl();
protected _onDestroy = new Subject<void>();
public filteredBanks: ReplaySubject<Book[]> = new ReplaySubject<Book[]>(1);
@ViewChild('singleSelect') singleSelect: MatSelect;
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
       this.bankCtrl.setValue(this.books);
       this.filteredBanks.next(this.books.slice());
       this.bankFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterBanks();
       });
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
  ngAfterViewInit() {
  }
 
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
  protected filterBanks()
   {
    if (!this.books) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.books.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.books.filter(book => book.Name.toLowerCase().indexOf(search) > -1)
    );
  }
}
