import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';

import { reducers } from '.';
import { ItemsEffects } from './items/items.effects';
import { WidgetsEffects } from './widgets/widgets.effects';

@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
    EffectsModule.forRoot([ItemsEffects, WidgetsEffects])
  ],
  declarations: []
})
export class StateModule {}
