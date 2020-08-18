import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-charge",
  templateUrl: "./charge.component.html",
  styleUrls: ["./charge.component.scss"],
})
export class ChargeComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
