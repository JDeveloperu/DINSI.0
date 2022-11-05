import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-interaction-area',
  templateUrl: './interaction-area.component.html',
  styleUrls: ['./interaction-area.component.scss']
})
export class InteractionAreaComponent implements OnInit, OnDestroy {
  userType = UserType.Undefined;

  userName = '';

  movements: any[] = [];

  private subscription!: Subscription;

  constructor(public blockchain: BlockchainService) {
  }

  get isOwner() {
    return this.userType === UserType.Owner;
  }

  get isInvestor() {
    return this.userType === UserType.Investor;
  }

  get isMember() {
    return this.userType === UserType.Member;
  }

  get isGuest() {
    return this.userType === UserType.Undefined || this.userType === UserType.NotAMember;
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

  reload() {
    this.load();
  }

  private async load() {
    const contract = this.blockchain.getContract();
    this.userType = await contract.getUserType(this.address);

    if (this.isInvestor || this.isMember) {
      const member = await contract.getMember(this.address);
      this.userName = member.name;
      this.movements = await contract.getMovements();
    }
  }
}
