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

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private gameRestService: GameRestService) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public async login() {
    await this.gameRestService.startLoading();
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    let authResult: AuthResult;
    
    authResult = await this.loginService.loginUser(loginCredentials);
    this.gameRestService.closeLoading();
    if (!authResult.success) {
      console.log(authResult);
      console.log(authResult.errors[0]);
      this.gameRestService.showErrorToast(authResult?.errors[0]);
    } else {
      this.router.navigate(['/main']);
    }
  }


}
