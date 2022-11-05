import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent implements OnInit, OnDestroy {
  balance = '';
  owner = '';
  userType = UserType.Undefined;

  private subscription!: Subscription;

  constructor(public blockchain: BlockchainService) {
  }

  private get address(): string {
    return this.blockchain.mmascara.address as string;
  }

  ngOnInit(): void {
    this.subscription = this.blockchain.connectionStatusChange.subscribe(isConnected => {
      if (isConnected) {
        this.load();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private async load() {
    const contract = this.blockchain.getContract();
    this.balance = await contract.getBalance();
    this.owner = await contract.owner();
    this.userType = await contract.getUserType(this.address);
  }
}
