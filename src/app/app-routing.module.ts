import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component"

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path:"registration", component: RegistrationFormComponent},
    {path:"login", component: LoginComponent},
    {path:"homePage", component: HomeComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
