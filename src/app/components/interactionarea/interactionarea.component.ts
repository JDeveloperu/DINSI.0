import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-interactionarea',
  templateUrl: './interactionarea.component.html',
  styleUrls: ['./interactionarea.component.scss']
})
export class InteractionareaComponent implements OnInit {
  constructor(public blockchain: BlockchainService) { }

  ngOnInit(): void {
  }

}
