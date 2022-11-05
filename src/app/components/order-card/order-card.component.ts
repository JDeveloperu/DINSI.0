import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';
import { IMember } from 'src/app/interfaces/member.interface';
import { IOrder } from 'src/app/interfaces/order.interface';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { zeroAddress } from 'src/app/logic/constants';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit, OnDestroy {
  order!: IOrder;

  to!: IMember | null;

  private userType = UserType.Undefined;

  private subscription!: Subscription;

  constructor(public blockchain: BlockchainService) {
  }

  get isConnected() {
    return this.blockchain.mmascara.isConnected;
  }

  get isOrderEmpty() {
    return !this.order || this.order.to === zeroAddress;
  }

  get isOrderFinished() {
    return this.order?.finished;
  }

  get canApproveOrder() {
    if (this.isOrderEmpty && this.order.finished) {
      return false;
    }

    if (this.order.to.toLowerCase() === this.address.toLowerCase()) {
      return false;
    }

    if (this.userType !== UserType.Investor && this.userType !== UserType.Member) {
      return false;
    }

    if (this.userType === UserType.Investor && this.order.approvedByInvestor > 0) {
      return false;
    }

    if (this.userType === UserType.Member && this.order.approved > 0) {
      return false;
    }

    return true;
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

  async approveOrder() {
    if (!this.canApproveOrder) {
      return;
    }

    const contract = this.blockchain.getContract();
    await contract.approveOrder(this.address, true, true);

    alert('The order has been approved!');

    await this.load();
  }

  async rejectOrder() {
    if (!this.canApproveOrder) {
      return;
    }

    const contract = this.blockchain.getContract();
    await contract.approveOrder(this.address, false, true);

    alert('The order has been rejected!');

    await this.load();
  }

  private async load() {
    const contract = this.blockchain.getContract();
    this.userType = await contract.getUserType(this.address);
    this.order = await contract.getOrder();
    this.to = null;

    if (!this.isOrderEmpty) {
      this.to = await contract.getMember(this.order.to);
    }
  }
}
