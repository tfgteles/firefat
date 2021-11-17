import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResult, UserRegistration } from 'src/app/models/auth-dtos';
import { GameRestService } from 'src/app/services/game-rest.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupFormGroup: FormGroup;
  public showSpinner: boolean;

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder, 
    private gameRestService: GameRestService,
    private router: Router) { }

  ngOnInit() {
    this.signupFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
    this.showSpinner = false;
  }

  public async register() {
    this.showSpinner = true;
    const userRegistration: UserRegistration = {
      username: this.signupFormGroup.get('email').value,
      email: this.signupFormGroup.get('email').value,
      password: this.signupFormGroup.get('password1').value
    };
    let authResult: AuthResult;
    authResult = await this.loginService.registerUser(userRegistration);
    this.showSpinner = false;
    if (!authResult.success) {
      this.gameRestService.showErrorToast(authResult?.errors[0]);
    } else {
      this.router.navigate(['/main/home/user-profile']);
    }
  }

}
