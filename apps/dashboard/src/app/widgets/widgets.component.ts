import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Widget, WidgetsState, AddWidget, UpdateWidget, DeleteWidget, LoadWidgets, initialWidgets } from '@workspace/common-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  currentWidget: Widget;

  constructor(private store: Store<WidgetsState>) {
    this.widgets$ = store.pipe(
      select('widgets'),
      map((data: WidgetsState) => data.entities),
      map(data => Object.keys(data).map(k => data[k]))
    );
  }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
  }

  resetCurrentWidget() {
    this.currentWidget = { id: null, name: '', price: 0, description: '' };
  }

  selectWidget(widget) {
    this.currentWidget = widget;
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.store.dispatch(new LoadWidgets(initialWidgets));
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
