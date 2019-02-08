import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  hide=true;
  submitted = false;
  isValid=false;
  constructor(private router : Router,private formBuilder:FormBuilder) { }
  HideForm : boolean;
  myVar : boolean;
  checkvalue : boolean;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  // onSubmit()
  // {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //       return;
  //   }
  // }
RegistrationForm()
{
  this.router.navigate(['/registration']);
}
HomePage()
{
  if (this.loginForm.invalid) {
          return;
      }
  this.router.navigate(['/homePage']);
}
CreateBook()
{
  this.router.navigate(['/createBooks'])
}
// LoginForm()
// {
//   this.HideForm = false;
//   this.checkvalue = this.myVar;
// }
}
