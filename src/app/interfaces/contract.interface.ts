import { UserType } from "../enums/user-type.enum";
import { IMember } from "./member.interface";
import { IOrder } from "./order.interface";
import { IOwnable } from "./ownable.interface";

export interface IContract extends IOwnable {
  addMember(sender: string, newMemberName: string, newMemberAddress: string, isNewMemberAnInvestor: boolean): Promise<void>;
  getMember(address: string): Promise<IMember>;
  getBalance(): Promise<string>;
  getMemberStatus(address: string): Promise<number>;
  getUserType(address: string): Promise<UserType>;
  getOrder(): Promise<IOrder>;
  approveOrder(sender: string, approve: boolean, autoWithdraw: boolean): Promise<any>;
  addOrder(sender: string, amount: string, reason: string): Promise<any>;
  getMovements(): Promise<any[]>;
}
