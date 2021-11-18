import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResult } from 'src/app/models/auth-dtos';
import { UserProfile } from 'src/app/models/user-profile.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public profileFormGroup: FormGroup;
  public showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private gameDataService: GameDataService, 
    private gameRestService: GameRestService,
    private router: Router,
    private loginService: LoginService) {
    this.profileFormGroup = this.formBuilder.group({
      firstName: [this.gameDataService.currentUser.firstName, Validators.required],
      lastName: [this.gameDataService.currentUser.lastName, Validators.required],
      userName: [this.gameDataService.currentUser.userName],
      userGender: [this.gameDataService.currentUser.userGender],
      dateOfBirth: [this.gameDataService.currentUser.dateOfBirth],
      phoneNumber: [this.gameDataService.currentUser.phoneNumber],
      streetAddress: [this.gameDataService.currentUser.streetAddress],
      city: [this.gameDataService.currentUser.city],
      province: [this.gameDataService.currentUser.province],
      postalCode: [this.gameDataService.currentUser.postalCode],
      country: [this.gameDataService.currentUser.country],
      userHeight: [this.gameDataService.currentUser.userHeight],
      userBio: [this.gameDataService.currentUser.userBio],
      userPhoto: [this.gameDataService.currentUser.userPhoto],
    });
  }

  ngOnInit() {
    this.showSpinner = false;
  }

  /** Update user profile */
  public updateProfile() {
    this.showSpinner = true;
    let userProfile: UserProfile = {
      id: this.gameDataService.currentUser.id,
      userEmail: this.gameDataService.currentUser.userEmail,
      preferredGameId: this.gameDataService.currentUser.preferredGameId,
      isAppAdmin: this.gameDataService.currentUser.isAppAdmin,
      ...this.profileFormGroup.value
    };
    userProfile.userName = userProfile.userName? userProfile.userName : userProfile.firstName + ' ' + userProfile.lastName;
    this.gameRestService.updateUserProfile(userProfile.id, userProfile).subscribe(() => {
      this.gameRestService.showSuccessToast('Profile successfully updated.');
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.gameRestService.getLoggedInUserProfile().subscribe(resp => {
        this.gameDataService.currentUser = {...resp};
        this.router.navigate(['/main/home']);
      },
      err => {
        this.showSpinner = false;
        this.gameRestService.showErrorToast(err);
      },
      () => {
        this.router.navigate(['/main/home']);
      });
    });
  }

  /** Delete the user profile and account */
  public async deleteProfile() {
    this.showSpinner = true;
    let authResult: AuthResult;
    authResult = await this.loginService.deleteUser(this.gameDataService.currentUser.id);
    this.showSpinner = false;
    if (!authResult.success) {
      this.gameRestService.showErrorToast(authResult?.errors[0]);
    } else {
      this.router.navigate(['/login']);
    }
  }


}
