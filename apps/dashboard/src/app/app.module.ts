import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonDataModule } from '@workspace/common-data';
import { TotalsViewModule } from '@workspace/totals-view';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetDetailComponent } from './widgets/widget-detail/widget-detail.component';
import { WidgetsListComponent } from './widgets/widgets-list/widgets-list.component';
import { ItemsTotalComponent } from './items/items-total/items-total.component';
import { WidgetsTotalComponent } from './widgets/widgets-total/widgets-total.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemDetailComponent,
    ItemsTotalComponent,
    WidgetsComponent,
    WidgetDetailComponent,
    WidgetsListComponent,
    WidgetsTotalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppMaterialModule,
    CommonDataModule,
    TotalsViewModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
