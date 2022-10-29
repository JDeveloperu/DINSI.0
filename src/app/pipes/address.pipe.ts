import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectButtonComponent } from './connect-button/connect-button.component';
import { PipesModule } from '../pipes/pipes.module';
import { InteractionareaComponent } from './interactionarea/interactionarea.component';

@NgModule({
  declarations: [
    ConnectButtonComponent,
    InteractionareaComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    ConnectButtonComponent,
    InteractionareaComponent,
  ]
})
export class ComponentsModule { }
