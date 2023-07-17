import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from '../services/customer-details.service';
// @ts-ignore
import { TransactionDetailsService } from '../services/transaction-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDetails} from "../classes/account-details";
import { Transaction} from "../classes/transaction-details";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class MainComponent implements OnInit {

  private haveData = 0;
  private data: AccountDetails[] = [];
  private dataRequest = false;
  private accountName = '';
  private amount = 0;
  private transactionType = '';

  constructor(
    private customerDetailsService: CustomerDetailsService,
    private transactionDetailsService: TransactionDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Check if the user is logged in or redirect to login page
    if (!this.customerDetailsService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.getAdminData();
    }
  }

  getAdminData() {
    this.haveData = 0;
    this.dataRequest = true;

    // Call the getCustomerDetail method from the service
    this.customerDetailsService.getCustomerDetail().subscribe(
      (response: any) => {
        this.data = response; // Assuming the API returns an array of AccountDetails
        if (this.data.length > 0) {
          this.haveData = 1;
        }
      },
      (error) => {
        console.log("Error while getting Admin Data");
      }
    );
  }

  createAccount(accountName: string) {
    // Assuming the request body requires accountName
    const request: AccountDetails = {
      id: 0, // You may set it to 0 since the server will assign an ID
      accountName: accountName,
      balance: 0,
      accountRefID: '',
      customer: null,
      transactions: []
    };

    this.customerDetailsService.registerCustomer(request).subscribe(
      (response) => {
        // Handle successful account creation, if needed
        console.log("Account created:", response);
        this.getAdminData(); // Update the data after creating an account
        this.accountName = '';
      },
      (error) => {
        console.log("Error while creating an account:", error);
      }
    );
  }

  performTransaction(accountId: number) {
    const transaction: Transaction = new Transaction(0, this.amount); // Assuming the server assigns transaction ID

    // Assuming the server requires accountId and transactionType for transactions
    const request = {
      accountId: accountId,
      transaction: transaction,
      transactionType: this.transactionType
    };

    // Assuming the API has an endpoint for transactions
    if (this.transactionType === 'DEPOSIT') {
      this.transactionDetailsService.depositAmount(request).subscribe(
        (response) => {
          console.log("Deposit successful:", response);
          this.getAdminData(); // Update the data after performing a transaction
          this.amount = 0;
        },(error) => {
          console.log("Error while performing a deposit:", error);
        }
      );
    } else if (this.transactionType === 'WITHDRAW') {
      this.transactionDetailsService.withdrawAmount(request).subscribe(
        (response) => {
          console.log("Withdraw successful:", response);
          this.getAdminData(); // Update the data after performing a transaction
          this.amount = 0;
        },
        (error) => {
          console.log("Error while performing a withdraw:", error);
        }
      );
    } else {
      console.log("Invalid transaction type");
    }
  }
}
