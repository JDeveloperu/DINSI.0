import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-guest-area',
  templateUrl: './guest-area.component.html',
  styleUrls: ['./guest-area.component.scss']
})
export class GuestAreaComponent implements OnInit {
  @Output() reloadClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  reload() {
    this.reloadClick.emit();
  }
}
