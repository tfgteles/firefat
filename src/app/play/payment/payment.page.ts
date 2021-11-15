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
  public fileName: string = '';
  public file: File = null;

  constructor(private formBuilder: FormBuilder, 
    private gameRestService: GameRestService,
    private gameDataService: GameDataService) { }

  ngOnInit() {
    this.paymentFormGroup = this.formBuilder.group({
      paymentDate: [''],
      amountPaid: ['', Validators.required]
    });

    this.memberId = this.gameDataService.currentMemberId();

  }

  public enterPayment() {
    this.gameRestService.startLoading();
    const formData = new FormData();
    formData.append('payeeId', this.memberId.toString());
    formData.append('paymentDate', this.paymentFormGroup.get('paymentDate').value);
    formData.append('amountPaid', this.paymentFormGroup.get('amountPaid').value.toString());
    formData.append('receiptImage', this.file, this.fileName);
    
    this.gameRestService.sendPayment(formData).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentGame.members.find(m => m.id === this.memberId).payments.push({...resp});
      this.gameRestService.closeLoading();
    });
  }

  /**
   * Upload the file chosen by the user
   * @param evt 
   */
   public loadImage(evt) {
    console.log(evt.target.files[0]);
    this.file = <File>evt.target.files[0];
    this.fileName = this.file.name;
  }


}
