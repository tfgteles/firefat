import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredential } from '../models/auth-dtos';
import { LoginService } from '../services/login.service';
import { AuthResult } from '../models/auth-dtos';
import { GameRestService } from '../services/game-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginFormGroup: FormGroup;
  public showSpinner: boolean;

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private gameRestService: GameRestService) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.showSpinner = false;
  }

  /** Call the login service */
  public async login() {
    this.showSpinner = true;
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    let authResult: AuthResult;
    authResult = await this.loginService.loginUser(loginCredentials);
    this.showSpinner = false;
    if (!authResult.success) {
      this.gameRestService.showErrorToast(authResult?.errors[0]);
    } else {
      this.router.navigate(['/main']);
    }
  }


}
