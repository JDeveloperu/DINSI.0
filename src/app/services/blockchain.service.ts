import { Injectable } from '@angular/core';
import { MetaMascara, MetaMascaraFactory } from 'mmascara';
import { tokenAddress, contractAddress } from '../src/addresses';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private mmascaraInstance: MetaMascara | null;

constructor(){
  this.mmascaraInstance = null;
}

get tokenAddress(){
  return this.tokenAddress;
}

get contractAddress(){
  return this.contractAddress;
}

  get mmascara() : MetaMascara {
    if (!this.mmascaraInstance) {
    const instance = MetaMascaraFactory.newInstance((window as any).detectEthereumProvider);
    this.mmascaraInstance = instance;
    }

    return this.mmascaraInstance;
   }
}
