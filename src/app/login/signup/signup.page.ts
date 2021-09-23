import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResult, UserRegistration } from 'src/app/models/auth-dtos';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupFormGroup: FormGroup;

  public showErrorMessage: boolean;

  public errorMessage: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
    this.showErrorMessage = false;
    this.errorMessage = '';
  }

  public async register() {
    const userRegistration: UserRegistration = {
      username: this.signupFormGroup.get('email').value,
      email: this.signupFormGroup.get('email').value,
      password: this.signupFormGroup.get('password1').value
    };
    let authResult: AuthResult;
    console.log(userRegistration);
    authResult = await this.loginService.registerUser(userRegistration);
    if (!authResult.success) {
      this.errorMessage = authResult.errors[0];
      this.showErrorMessage = true;
      console.log(this.errorMessage);
    }
  }

}
