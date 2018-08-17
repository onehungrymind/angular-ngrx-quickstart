import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemsService } from './items/items.service';
import { ItemsEffects } from './state/items.effects';
import { ItemsFacade } from './state/items.facade';
import { initialState as itemsInitialState, itemsReducer } from './state/items.reducer';
import { WidgetsEffects } from './state/widgets.effects';
import { initialState as widgetsInitialState, widgetsReducer } from './state/widgets.reducer';
import { WidgetsService } from './widgets/widgets.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('items', itemsReducer, { initialState: itemsInitialState }),
    StoreModule.forFeature('widgets', widgetsReducer, { initialState:  widgetsInitialState}),
    EffectsModule.forFeature([ItemsEffects, WidgetsEffects]),
  ],
  providers: [
    ItemsService,
    WidgetsService,
    ItemsEffects,
    ItemsFacade,
    WidgetsEffects
  ],
  exports: [
    StoreModule,
    EffectsModule
  ]
})

export class CommonDataModule {
}
