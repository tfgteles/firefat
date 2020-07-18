import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cash",
  templateUrl: "./cash.page.html",
  styleUrls: ["./cash.page.scss"],
})
export class CashPage implements OnInit {
  // Variable to control the payment details
  // public showPayments = false;
  // public paymentIcon = 'chevron-down-outline';

  constructor() {}

  ngOnInit() {}

  /**
   * Toggle between show payment details or not
   */
  // paymentDetail() {
  //   if (this.showPayments) {
  //     this.showPayments = false;
  //     this.paymentIcon = 'chevron-down-outline';
  //   } else {
  //     this.showPayments = true;
  //     this.paymentIcon = 'chevron-up-outline';
  //   }
  // }
}
