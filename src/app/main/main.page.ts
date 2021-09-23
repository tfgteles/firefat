import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public logout() {
    this.loginService.logout();
  }

}
