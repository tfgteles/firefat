import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-weight",
  templateUrl: "./weight.component.html",
  styleUrls: ["./weight.component.scss"],
})
export class WeightComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
