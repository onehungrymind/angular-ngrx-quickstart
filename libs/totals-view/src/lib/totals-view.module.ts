import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalsComponent } from './totals/totals.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TotalsComponent],
  exports: [TotalsComponent]
})
export class TotalsViewModule {
}
