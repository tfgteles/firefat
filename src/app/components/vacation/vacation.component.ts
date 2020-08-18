import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-vacation",
  templateUrl: "./vacation.component.html",
  styleUrls: ["./vacation.component.scss"],
})
export class VacationComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
