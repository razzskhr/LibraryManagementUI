import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl, FormGroupDirective, NgForm,FormControlName } from '@angular/forms';
import { MustMatch } from '../CustomValidations/MustMatch';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from '../services/authenticationService';
import {User, GenderType, RoleType} from '../model/user.model';
import { getMatInputUnsupportedTypeError } from '@angular/material';

const now = new Date();
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  passwordFormGroup: FormGroup;
  submitted = false;
  constructor(private router : Router,private formBuilder:FormBuilder, private authService : AuthenticationService) {   }
  year=now.getFullYear();
  month=now.getMonth();
  date=now.getDate();
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(this.year, this.month,this.date);
  genderValues = GenderType;
  userValues = RoleType;
  genderKeys() : Array<string> {
    var keys = Object.keys(this.genderValues);
    return keys.slice(keys.length / 2);
}
userKeys() : Array<string> {
  var keys = Object.keys(this.userValues);
  return keys.slice(keys.length / 2);
}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName:['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])] ,
      LastName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      MiddleName: ['', Validators.required],
      UserName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')])],
      UserID:['',Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z]+.[a-zA-Z]{3}$')])],
      Gender: [GenderType.male, Validators.required] ,
      DateOfBirth:['',Validators.required],
      PhoneNumber:['',Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      RoleType:['',Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('Password', 'ConfirmPassword')
  });
  }
  matcher = new MyErrorStateMatcher();
  LoginForm()
  {
    this.router.navigate(['/login']);
  }
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
this.authService.registration(this.registerForm.value).subscribe(
  details => {
    this.LoginForm();
  },
  error  => {
  console.log("Error", error);
  }
  
)

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    console.log(JSON.stringify(this.registerForm.value));
  }
}
  
export class MyErrorStateMatcher implements ErrorStateMatcher
 {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
