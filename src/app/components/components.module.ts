import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectButtonComponent } from './connect-button/connect-button.component';
import { PipesModule } from '../pipes/pipes.module';
import { InteractionAreaComponent } from './interaction-area/interaction-area.component';
import { InformationCardComponent } from './informarion-card/information-card.component';
import { OwnerAreaComponent } from './owner-area/owner-area.component';
import { InvestorAreaComponent } from './investor-area/investor-area.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { GuestAreaComponent } from './guest-area/guest-area.component';
import { FormsModule } from '@angular/forms';
import { OrderCardComponent } from './order-card/order-card.component';

@NgModule({
  declarations: [
    ConnectButtonComponent,
    InteractionAreaComponent,
    InformationCardComponent,
    OwnerAreaComponent,
    InvestorAreaComponent,
    MemberAreaComponent,
    GuestAreaComponent,
    OrderCardComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
  ],
  exports: [
    ConnectButtonComponent,
    InteractionAreaComponent,
  ],
})
export class ComponentsModule { }
