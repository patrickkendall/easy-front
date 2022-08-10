import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  account = {
    startingBalance: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}
