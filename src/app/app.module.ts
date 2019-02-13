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
        MatCheckboxModule,MatNativeDateModule,MatGridListModule,MatFormFieldModule,MatDatepickerModule,MatRadioModule,MatSelectModule } from '@angular/material';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{Book} from './model/book.model';
import{Isbn} from './model/isbn.model';
import {BookService} from './services/book.service';
import {UserService} from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AddbooksComponent } from './addbooks/addbooks.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreatebookdataComponent } from './createbookdata/createbookdata.component';
import 'hammerjs';
import { DashboardIndicatorComponent } from './dashboard-indicator/dashboard-indicator.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationFormComponent,
    HomeComponent,
    AddbooksComponent,
    CreatebookdataComponent,
    DashboardIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,MatCardModule, MatButtonModule,MatIconModule,MatSortModule,MatFormFieldModule,MatDatepickerModule,
    MatInputModule,BrowserAnimationsModule,MatPaginatorModule,MatTableModule,MatCheckboxModule,
    HttpClientModule,MatRadioModule,MatNativeDateModule,MatGridListModule,MatDialogModule,MatSelectModule,
    AmChartsModule  
  ],
  providers: [UserService,BookService],
  bootstrap: [AppComponent],
  entryComponents:[CreatebookdataComponent]
})
export class AppModule { }
