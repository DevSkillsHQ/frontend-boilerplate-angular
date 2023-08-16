import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];
  firstTransaction: any;
  firstTransactionAccountId: string = '';
  accountBalance: number | undefined;
  transaction = { amount: 0, account_id: '' };

  showAccountIdError: boolean = false;
  showAmountError: boolean = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.firstTransaction = transactions[0];
        this.firstTransactionAccountId = this.firstTransaction.account_id;

        this.loadAccountDetails(this.firstTransactionAccountId);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
      );
    }

    loadAccountDetails(accountId: string) {
      this.transactionService.getAccountDetails(accountId).subscribe(
        (accountDetails) => {
          this.accountBalance = accountDetails.balance;
          console.log('Received transactions:', this.accountBalance)
      },
      (error) => {
        console.error('Error fetching account balance:', error);
      }
    );
  }

  submitForm() {

    this.showAccountIdError = false;
    this.showAmountError = false;

    if (!this.isValidUUID(this.transaction.account_id)) {
    this.showAccountIdError = true;
      return;
    }

    const parsedAmount = Number(this.transaction.amount);
    if (isNaN(parsedAmount)) {
      this.showAmountError = true;
      return;
    }

    this.transactionService.createTransaction(this.transaction).subscribe(
      () => {
        console.log('Transaction submitted successfully');
        this.loadTransactions();
        this.transaction = { amount: 0, account_id: '' };
      },
      (error) => {
        console.error('Error submitting transaction:', error);
      }
    );
  }

  isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}
