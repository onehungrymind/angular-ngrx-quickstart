import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Widget, WidgetsState, AddWidget, UpdateWidget, DeleteWidget, LoadWidgets, selectAllWidgets, SelectWidget, WidgetsFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  currentWidget$: Observable<Widget>;

  constructor(
    private facade: WidgetsFacade
  ) {
    this.widgets$ = facade.allWidgets$
    this.currentWidget$ = facade.currentWidget$
  }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
  }

  resetCurrentWidget() {
    this.selectWidget({ id: null });
  }

  selectWidget(widget) {
    this.facade.selectWidget(widget.id);
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.facade.loadAll();
  }

  saveWidget(widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget) {
    this.facade.createWidget(widget);
  }

  updateWidget(widget) {
    this.facade.updateWidget(widget);
  }

  deleteWidget(widget) {
    this.facade.deleteWidget(widget.id);
  }
}
