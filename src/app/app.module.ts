import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddbooksComponent } from './addbooks/addbooks.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatRadioModule,MatIconModule} from '@angular/material';
import {MatNativeDateModule,MatGridListModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { CreatebookdataComponent } from './createbookdata/createbookdata.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationFormComponent,
    HomeComponent,
    AddbooksComponent,
    CreatebookdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,BrowserAnimationsModule,MatButtonModule, MatCheckboxModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatRadioModule
    ,MatDialogModule,MatGridListModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CreatebookdataComponent]
})
export class AppModule { }
