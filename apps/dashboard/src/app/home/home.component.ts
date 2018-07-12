import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../core/items.service';
import { Item } from '../core/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  items: Item[];

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemsService.all()
      .subscribe((items: Item[]) => this.items = items);
  }
}
