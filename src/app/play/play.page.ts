import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { WeightComponent } from "../components/weight/weight.component";
import { VacationComponent } from "../components/vacation/vacation.component";
import { PaymentComponent } from "../components/payment/payment.component";
import { ChargeComponent } from "../components/charge/charge.component";

@Component({
  selector: "app-play",
  templateUrl: "./play.page.html",
  styleUrls: ["./play.page.scss"],
})
export class PlayPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentWeightModal() {
    const modal = await this.modalController.create({
      component: WeightComponent,
    });
    return await modal.present();
  }

  async presentVacationModal() {
    const modal = await this.modalController.create({
      component: VacationComponent,
    });
    return await modal.present();
  }

  async presentPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentComponent,
    });
    return await modal.present();
  }

  async presentChargeModal() {
    const modal = await this.modalController.create({
      component: ChargeComponent,
    });
    return await modal.present();
  }
}
