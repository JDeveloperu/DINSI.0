import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/interfaces/member.interface';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-owner-area',
  templateUrl: './owner-area.component.html',
  styleUrls: ['./owner-area.component.scss']
})
export class OwnerAreaComponent implements OnInit {
  newMemberName = '';
  newMemberAddress = '';
  isNewMemberAnInvestor = false;

  readMemberAddress = '';
  lastMember: IMember | null = null;

  constructor(private blockchain: BlockchainService) {
  }

  ngOnInit(): void {
  }

  async readMember() {
    const contract = this.blockchain.getContract();
    const member = await contract.getMember(this.readMemberAddress);
    this.lastMember = member;
  }

  async addNewMember() {
    const contract = this.blockchain.getContract();
    await contract.addMember(this.blockchain.mmascara.address as string,this.newMemberName, this.newMemberAddress, this.isNewMemberAnInvestor);

    alert('Member registered!');
  }
}
