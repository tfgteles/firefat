import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/models/payment.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public paymentFormGroup: FormGroup;
  public memberId: number = 0;

  constructor(private formBuilder: FormBuilder, 
    private gameRestService: GameRestService,
    private gameDataService: GameDataService) { }

  ngOnInit() {
    this.paymentFormGroup = this.formBuilder.group({
      paymentDate: [''],
      amountPaid: ['', Validators.required]
    });

    for (let m of this.gameDataService.currentGame.members) {
      if (m.playerId === this.gameDataService.currentUser.id) {
        this.memberId = m.id;
        console.log(this.memberId);
        break;
      }
    }

  }

  public enterPayment() {
    let payment: Payment = {
      payeeId: this.memberId,
      paymentDate: this.paymentFormGroup.get('paymentDate').value,
      amountPaid: this.paymentFormGroup.get('amountPaid').value
    };
    
    this.gameRestService.sendPayment(payment).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentGame.members.find(m => m.id === this.memberId).payments.push({...resp});
    });
  }

}
