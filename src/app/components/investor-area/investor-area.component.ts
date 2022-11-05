import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-investor-area',
  templateUrl: './investor-area.component.html',
  styleUrls: ['./investor-area.component.scss']
})
export class InvestorAreaComponent implements OnInit {

  constructor(private blockchain: BlockchainService) { }

  ngOnInit(): void {
  }

  get tokenAddress() {
    return this.blockchain.tokenAddress;
  }

  get contractAddress() {
    return this.blockchain.contractAddress;
  }
}
