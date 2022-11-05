import { Component, OnDestroy, OnInit } from '@angular/core';
import BigNumber from 'bignumber.js';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/order.interface';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { BigNumberUtils } from 'src/app/logic/big-number-utils';
import { tokenDecimals } from 'src/app/logic/constants';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.scss']
})
export class MemberAreaComponent implements OnInit, OnDestroy {
  currentOrder!: IOrder;

  newOrderAmount!: string;

  newOrderReason!: string;

  constructor(public blockchain: BlockchainService) {
  }

  private get address(): string {
    return this.blockchain.mmascara.address as string;
  }

  get isOrderFinished() {
    return this.currentOrder.finished;
  }

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
  }

  async addNewOrder() {
    if (!this.newOrderAmount || !this.newOrderReason) {
      alert('All fields are required.');
      return;
    }

    if (Number.isNaN(this.newOrderAmount)) {
      alert('Order amount value is wrong.');
      return;
    }

    const usdValue = +this.newOrderAmount;

    if (usdValue <= 0) {
      alert('Order amount value is wrong.');
      return;
    }

    const contract = this.blockchain.getContract();

    const balance = new BigNumber(await contract.getBalance());

    const orderAmount = new BigNumber(BigNumberUtils.getBigNumberFromDecimal(usdValue, tokenDecimals));

    if (orderAmount.isGreaterThan(balance)) {
      alert('Order amount exceeds contract balance.');
      return;
    }

    await contract.addOrder(this.address, orderAmount.toString(), this.newOrderReason);

    alert('The order has been created!');

    this.newOrderAmount = '';
    this.newOrderReason = '';
  }

  private async load() {
    const contract = this.blockchain.getContract();
    this.currentOrder = await contract.getOrder();
  }
}
