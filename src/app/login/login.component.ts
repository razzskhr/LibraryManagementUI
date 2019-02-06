import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }
  HideForm : boolean;
  myVar : boolean;
  checkvalue : boolean;
  ngOnInit() {

  }

  RegistrationForm()
{
  this.router.navigate(['/registration']);
}
HomePage()
{
  this.router.navigate(['/homePage']);
}

// LoginForm()
// {
//   this.HideForm = false;
//   this.checkvalue = this.myVar;
// }
}
