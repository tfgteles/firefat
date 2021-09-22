import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredential } from '../models/login-credential.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthResult } from '../models/auth-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private router: Router, private loginService: LoginService, formBuilder: FormBuilder) {
    this.loginFormGroup = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  public async login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    let authResult: AuthResult;
    console.log(loginCredentials);
    authResult = await this.loginService.loginUser(loginCredentials);
    console.log(authResult.success);
    // this.loginService.loginUser(loginCredentials).subscribe((authData) => {
      // this.router.navigate(['/main']);
      // console.log(authData);
    // })/* .catch((authError) => {
      // console.log('Auth Error => ', authError);
    // }) */;
    this.router.navigate(['/main']); // temporary - to be deleted once authentication is implemented
  }

}
