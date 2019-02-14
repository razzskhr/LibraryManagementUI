import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {AuthenticationService} from '../services/authenticationService'

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
  constructor(private router : Router,private formBuilder:FormBuilder,  private authService : AuthenticationService) { }
  HideForm : boolean;
  myVar : boolean;
  checkvalue : boolean;
  ShowInvalidLogin : boolean;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
  });
  }
  onSubmit()
  {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      details => {
        if(details == true)
        {
          this.ShowInvalidLogin = false;
          this.authService.GetCurrentUser().subscribe(
            data => {
              if(data)
              this.router.navigate(['/homePage']);
            }
          )
        }
        else
        {
          this.ShowInvalidLogin = true;
        }
      },
      error  => {
      console.log("Error", error);
      this.ShowInvalidLogin = true;
      }
    );
  }
RegistrationForm()
{
  this.router.navigate(['/registration']);
}
// LoginForm()
// {
//   this.HideForm = false;
//   this.checkvalue = this.myVar;
// }
}
