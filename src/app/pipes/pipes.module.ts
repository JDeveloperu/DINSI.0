import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe } from './address.pipe';
import { BignumberPipe } from './bignumber.pipe';

@NgModule({
  declarations: [
    AddressPipe,
    BignumberPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AddressPipe,
    BignumberPipe,
  ]
})
export class PipesModule { }
