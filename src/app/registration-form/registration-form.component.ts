import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  LoginForm()
  {
    this.router.navigate(['/login']);
  }

  HomePage()
{
  this.router.navigate(['/homePage']);
}

}
