import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { DashComponent } from './dash/dash.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent, DashComponent],
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  entryComponents: [DashComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(DashComponent, {injector: this.injector});
    customElements.define('embedded-dashboard', el);
  }

}
