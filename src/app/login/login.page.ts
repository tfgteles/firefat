import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredential } from '../models/auth-dtos';
import { LoginService } from '../services/login.service';
import { AuthResult } from '../models/auth-dtos';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginFormGroup: FormGroup;
  public showErrorMessage: boolean;
  public errorMessage: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.errorMessage = '';
    this.showErrorMessage = false;
  }

  public async login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    let authResult: AuthResult;
    authResult = await this.loginService.loginUser(loginCredentials);
    if (!authResult.success) {
      this.errorMessage = authResult.errors[0];
      this.showErrorMessage = true;
      console.log(this.errorMessage);
    }
  }

}
