import { Component, OnInit } from '@angular/core';
import { MainService } from '../Service/main.service';
import { Account } from '../Model/account';
import { Transaction } from '../Model/transaction';
import {Customer} from "../Model/customer";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  account: Account | null = null;
  transactions: Transaction[] = [];
  depositAmount: number = 0;
  withdrawAmount: number = 0;
  customer: Customer | null = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.fetchCustomerDetails();
  }
  fetchCustomerDetails(): void {
    const customerId = 1;// to check it its getting data from the database
    this.mainService.getCustomerDetails(customerId).subscribe(
      (customer: Customer) => {
        this.customer = customer;
      },
      (error) => {
        console.error('Error fetching customer details:', error);
      }
    );
  }
  createAccount(): void {
    const accountName = window.prompt('Enter Account Name:');
    if (accountName) {
      this.mainService.createAccount(this.account?.customer.id|| 0, <Account>{ accountName: accountName }).subscribe(
        (account: Account) => {
          this.account = account;
          this.fetchTransactions();
        },
        (error) => {
          console.error('Error creating account:', error);
        }
      );
    }
  }

  fetchTransactions(): void {
    if (this.account) {
      this.mainService.getTransactions(this.account.customer.id, this.account.id).subscribe(
        (transactions: Transaction[]) => {
          this.transactions = transactions;
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    }
  }

  deposit(): void {
    if (this.account) {
      this.mainService.deposit(this.account.customer.id, this.account.id, this.depositAmount).subscribe(
        (account: Account) => {
          this.account = account;
          this.fetchTransactions(); // Fetch transactions after depositing
        },
        (error) => {
          console.error('Error depositing:', error);
        }
      );
    }
  }

  withdraw(): void {
    if (this.account) {
      this.mainService.withdraw(this.account.customer.id, this.account.id, this.withdrawAmount).subscribe(
        (account: Account) => {
          this.account = account;
          this.fetchTransactions(); // Fetch transactions after withdrawing
        },
        (error) => {
          console.error('Error withdrawing:', error);
        }
      );
    }
  }
}
