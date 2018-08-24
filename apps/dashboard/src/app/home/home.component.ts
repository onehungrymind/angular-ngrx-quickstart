import { Component, OnInit } from '@angular/core';
import { Item, ItemsFacade, User, UsersFacade, Widget, WidgetsFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  users$: Observable<User[]> = this.usersFacade.allUsers$;

  constructor(
    private usersFacade: UsersFacade,
    private itemsFacade: ItemsFacade,
    private widgetsFacade: WidgetsFacade
  ) {}

  ngOnInit() {
    this.itemsFacade.loadAll();
    this.widgetsFacade.loadAll();
    this.usersFacade.loadUsers();
  }
}
