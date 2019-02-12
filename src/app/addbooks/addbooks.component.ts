import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { CreatebookdataComponent } from './../createbookdata/createbookdata.component';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  AddNewBooks()
  {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(CreatebookdataComponent,dialogConfig);
  }
}
