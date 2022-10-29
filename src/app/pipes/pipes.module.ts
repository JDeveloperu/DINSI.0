import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe } from './address.pipe';

@NgModule({
  declarations: [
    AddressPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddressPipe,
  ]
})
export class PipesModule { }
