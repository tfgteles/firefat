import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  // public playerFormGroup: FormGroup;
  // public activePlayer: Player;

  constructor(/* private formBuilder: FormBuilder */) { }

  ngOnInit() {
    /* this.playerFormGroup = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
      height: ['']
    }); */
  }

}
