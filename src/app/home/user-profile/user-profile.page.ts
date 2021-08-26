import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public profileFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileFormGroup = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      userGender: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      streetAddress: [''],
      city: [''],
      province: [''],
      postalCode: [''],
      country: [''],
      userHeight: [''],
      userBio: [''],
      userPhoto: [''],
    });
  }

  public updateProfile() {
    console.log('Profile update clicked');
  }

}
