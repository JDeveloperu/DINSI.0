import { UserType } from "../enums/user-type.enum";
import { IContract } from "../interfaces/contract.interface";
import { IMember } from "../interfaces/member.interface";
import { IMovement } from "../interfaces/movement.interface";
import { IOrder } from "../interfaces/order.interface";
import { ContractOwnableWrapper } from "./contract-ownable-wrapper";

export class ContractWrapper extends ContractOwnableWrapper implements IContract {
  constructor(contract: any) {
    super(contract);
  }

  override get ownerIsLocked() {
    return true;
  }

  async getBalance(): Promise<string> {
    const balance = await this.contract.methods.getBalance().call();
    return balance;
  }

  async getMemberStatus(address: string): Promise<number> {
    const memberStatus = await this.contract.methods.getMemberStatus(address).call();
    return +memberStatus;
  }

  async getUserType(address: string): Promise<UserType> {
    const owner = await this.owner();
    if (owner.toLowerCase() === address.toLowerCase()) {
      return UserType.Owner;
    }

    const memberStatus = await this.getMemberStatus(address);
    return memberStatus as UserType;
  }

  async addMember(sender: string, newMemberName: string, newMemberAddress: string, isNewMemberAnInvestor: boolean): Promise<void> {
    await this.contract.methods.addMember(newMemberName, newMemberAddress, isNewMemberAnInvestor).send({ from: sender });
  }

  async getMember(address: string): Promise<IMember> {
    const [name, _memberAddress, isEnabled, isInvestor, lastMovementDate] = await this.contract.methods.getMember(address).call();
    return { name, address, isEnabled, isInvestor, lastMovementDate };
  }

  async getOrder(): Promise<IOrder> {
    const order: IOrder = await this.contract.methods.order().call();
    return order;
  }

  async approveOrder(sender: string, approve: boolean, autoWithdraw: boolean): Promise<any> {
    const tx = await this.contract.methods.approveOrder(approve, autoWithdraw).send({ from: sender });
    return tx;
  }

  async addOrder(sender: string, amount: string, reason: string): Promise<any> {
    const tx = await this.contract.methods.addOrder(amount, reason).send({ from: sender });
    return tx;
  }

  async getMovements(): Promise<IMovement[]> {
    let i = 0;
    const result: any = [];

    try {
      while (true) {
        const movement: IMovement = await this.contract.methods.movements(i++).call();
        result.push(movement);
      }
    }
    catch (err) {
    }

    return result;
  }
}
