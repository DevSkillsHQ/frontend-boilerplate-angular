import { Component } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  transaction = { amount: 0, account_id: '' };

  constructor(private transactionService: TransactionService) {}

  submitForm() {
    this.transactionService.createTransaction(this.transaction).subscribe(
      response => {
        console.log('Transaction submitted successfully:', response);
        // Reset the form or perform any other necessary actions
        this.transaction = { amount: 0, account_id: '' };
      },
      error => {
        console.error('Error submitting transaction:', error);
      }
    );
  }
}
