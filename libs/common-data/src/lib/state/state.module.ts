import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';

import { reducers } from './index';
import { ItemsEffects } from './items/items.effects';
import { WidgetsEffects } from './widgets/widgets.effects';
import { UsersEffects } from './users/users.effects';

@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
    EffectsModule.forRoot([ItemsEffects, WidgetsEffects, UsersEffects]),
  ],
  declarations: []
})
export class StateModule { }
