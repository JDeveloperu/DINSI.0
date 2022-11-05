import { Injectable } from '@angular/core';
import { MetaMascara, MetaMascaraFactory } from 'mmascara';
import { Subject } from 'rxjs';
import { IContract } from '../interfaces/contract.interface';
import { abi } from '../logic/abi';
import { tokenAddress, contractAddress } from '../logic/addresses';
import { ContractWrapper } from '../logic/contract-wrapper';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  connectionStatusChange = new Subject<boolean>();

  private isConnectedToBlockchain = false;

  private mmascaraInstance: MetaMascara | null;

  constructor() {
    this.mmascaraInstance = null;
  }

  get tokenAddress() {
    return tokenAddress;
  }

  get contractAddress() {
    return contractAddress;
  }

  private get contractAbi() {
    return abi;
  }

  get mmascara(): MetaMascara {
    if (!this.mmascaraInstance) {
      const instance = MetaMascaraFactory.newInstance((window as any).detectEthereumProvider);
      this.mmascaraInstance = instance;
    }

    return this.mmascaraInstance;
  }

  async connect() {
    const result = await this.mmascara.connect();
    if (this.isConnectedToBlockchain !== result) {
      this.isConnectedToBlockchain = result;
      this.connectionStatusChange.next(result);
    }
    return result;
  }

  getContract(): IContract {
    const contract = this.mmascara.getContract(this.contractAddress, this.contractAbi);
    return new ContractWrapper(contract);
  }
}
