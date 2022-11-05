import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

const localStorageKey = 'solpag-autoconnect';

@Component({
  selector: 'app-connect-button',
  templateUrl: './connect-button.component.html',
  styleUrls: ['./connect-button.component.scss']
})
export class ConnectButtonComponent implements OnInit {
  private isConnectedToBlockchain = false;

  constructor(private blockchain: BlockchainService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem(localStorageKey) === 'true') {
      this.connect();
    }
  }

  get isConnected() {
    return this.isConnectedToBlockchain;
  }

  get connectedAddress(): string {
    return this.blockchain.mmascara.address as string;
  }

  async connect() {
    const result = await this.blockchain.connect();
    this.isConnectedToBlockchain = result;

    if (result) {
      localStorage.setItem(localStorageKey, 'true');
    }
  }
}
