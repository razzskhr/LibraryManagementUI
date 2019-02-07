import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../CustomValidations/MustMatch';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  passwordFormGroup: FormGroup;
  submitted = false;
  constructor(private router : Router,private formBuilder:FormBuilder) {   }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName:['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])] ,
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      middleName: ['', Validators.required],
      userName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      id:['',Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z]+.[a-zA-Z]{3}$')])],
      gender: ['', Validators.required] ,
      dob:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
  });
  }

  LoginForm()
  {
    this.router.navigate(['/login']);
  }

  HomePage()
{
  this.router.navigate(['/homePage']);
}
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
