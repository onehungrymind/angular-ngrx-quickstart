import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StateModule } from './state/state.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule
  ],
  providers: [],
  exports: []
})

export class CommonDataModule {
}
