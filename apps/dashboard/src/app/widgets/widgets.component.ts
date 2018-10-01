import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Widget, WidgetsState, AddWidget, UpdateWidget, DeleteWidget, LoadWidgets, selectAllWidgets, SelectWidget } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  currentWidget$: Observable<Widget>;

  constructor(private store: Store<WidgetsState>) {
    this.widgets$ = store.pipe(select(selectAllWidgets));
  }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
  }

  resetCurrentWidget() {
    this.selectWidget({ id: null });
  }

  selectWidget(widget) {
    this.store.dispatch(new SelectWidget(widget.id));
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.store.dispatch(new LoadWidgets());
  }

  saveWidget(widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget) {
    this.store.dispatch(new AddWidget(widget));
    this.resetCurrentWidget();
  }

  updateWidget(widget) {
    this.store.dispatch(new UpdateWidget(widget));
    this.resetCurrentWidget();
  }

  deleteWidget(widget) {
    this.store.dispatch(new DeleteWidget(widget));
    this.resetCurrentWidget();
  }
}
