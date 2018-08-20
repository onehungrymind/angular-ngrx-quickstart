import { Component, OnInit } from '@angular/core';
import { Widget, WidgetsFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]> = this.widgetsFacade.allWidgets$;
  currentWidget$: Observable<Widget> = this.widgetsFacade.currentWidget$;

  constructor(private widgetsFacade: WidgetsFacade) { }

  ngOnInit() {
    this.widgetsFacade.loadAll();
    this.widgetsFacade.mutations$.subscribe(_ => this.reset());
    this.reset();
  }

  reset() {
    this.selectWidget({id: null});
  }

  selectWidget(widget) {
    this.widgetsFacade.selectWidget(widget.id);
  }

  saveWidget(widget) {
    if (!widget.id) {
      this.widgetsFacade.addWidget(widget);
    } else {
      this.widgetsFacade.updateWidget(widget);
    }
  }

  deleteWidget(widget) {
    this.widgetsFacade.deleteWidget(widget);
  }
}
