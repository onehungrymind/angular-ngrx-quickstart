import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemsService } from './items/items.service';
import { WidgetsService } from './widgets/widgets.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemsReducer, initialState as itemsInitialState } from './state/items.reducer';
import { ItemsEffects } from './state/items.effects';
import { ItemsFacade } from './state/items.facade';
import { widgetsReducer, initialState as widgetsInitialState} from './state/widgets.reducer';
import { WidgetsEffects } from './state/widgets.effects';

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
