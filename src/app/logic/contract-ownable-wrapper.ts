export class ContractOwnableWrapper {
  private ownerAddress = '';

  constructor(private internalContract: any) {
  }

  protected get ownerIsLocked() {
    return false;
  }

  protected get contract(): any {
    return this.internalContract;
  }

  async owner(): Promise<string> {
    if (!this.ownerAddress || !this.ownerIsLocked) {
      this.ownerAddress = await this.contract.methods.owner().call();
    }

    return this.ownerAddress;
  }
}
