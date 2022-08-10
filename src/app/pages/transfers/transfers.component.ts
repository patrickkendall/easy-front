import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent implements OnInit {
  account = {
    startingBalance: 0,
  };
  remarks: string = '1';
  recievingBank: string = '1';
  accountNumber: number = 1;
  transactionWord: string = '1';
  reciever: string = '1';
  description: string = '1';
  transactionAmount: number = 1;
  sender: string = '1';
  withdrawalOrDeposit: string = 'Deposit';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  transactions: any;

  ngOnInit(): void {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.http
      .get('http://localhost:4000/transaction/transactions', {
        headers: headers,
      })
      .subscribe((res: any) => {
        this.transactions = res;
        console.log(this.transactions);
      });
  }
  onSelectedChange(event: any) {
    // do something else with the value
    console.log(event.target.value);

    // remember to update the selectedValue
    this.withdrawalOrDeposit = event.target.value;
  }

  submit() {
    if (
      this.remarks == '' ||
      this.recievingBank == '' ||
      this.accountNumber <= 0 ||
      this.reciever == '' ||
      this.transactionWord == '' ||
      this.transactionAmount <= 0 ||
      this.sender == '' ||
      this.description == ''
    ) {
      this.toastr.error(
        'Please fill out all the fields. account number and transaction amount cannot be less than or equal to zero.'
      );
    } else {
      var data = {
        transactionAmount: this.transactionAmount,
        remarks: 'Remark',
        accountNumber: 12345,
        recievingBank: 'USAA',
        reciever: 'John Doe',
        transactionWord: 'Transfer',
        sender: 'Jane Doe',
        withdrawalOrDeposit: this.withdrawalOrDeposit,
        timestamp: new Date(),
        description: this.description,
      };
      let headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', '*');
      this.http
        .post('http://localhost:4000/transaction/create', data, {
          headers: headers,
        })
        .subscribe((res: any) => {
          console.log(res);
          this.toastr.success('"Data has been posted successfully"');
          (<HTMLElement>document.getElementById("navBar")).scrollIntoView({behavior: "smooth"})
          this.ngOnInit()
        }),
        (error: any) => {
          console.log(error);
          this.toastr.error(
            JSON.stringify(error.error.message.replace(/"/g, ''))
          );
        };
    }
  }
}
