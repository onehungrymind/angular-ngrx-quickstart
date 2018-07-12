import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { createCustomElement } from '@angular/elements';
import { TotalsComponent } from '@workspace/totals-view';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  entryComponents: [TotalsComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(TotalsComponent, {injector: this.injector});
    customElements.define('totals-view', el);
  }

}
