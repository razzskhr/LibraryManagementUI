import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule, MatButtonModule,MatInputModule,MatPaginatorModule,MatIconModule,MatTableModule,MatSortModule,
  MatCheckboxModule, } from '@angular/material';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{Book} from './model/book.model';
import{Isbn} from './model/isbn.model';
import {UserService} from './services/book.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,MatCardModule, MatButtonModule,MatIconModule,MatSortModule,
    MatInputModule,BrowserAnimationsModule,MatPaginatorModule,MatTableModule,MatCheckboxModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
