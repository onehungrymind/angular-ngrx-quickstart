import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemsFacade } from '@workspace/common-data';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]> = this.itemsFacade.allItems$;
  currentItem$: Observable<Item> = this.itemsFacade.currentItem$;

  constructor(private itemsFacade: ItemsFacade,) { }

  ngOnInit() {
    this.itemsFacade.loadAll();
    this.itemsFacade.mutations$.subscribe(_ => this.resetCurrentItem());
    this.resetCurrentItem();
  }

  resetCurrentItem() {
    this.selectItem({id: null});
  }

  selectItem(item) {
    this.itemsFacade.selectItem(item.id);
  }

  saveItem(item) {
    if (!item.id) {
      this.itemsFacade.addItem(item);
    } else {
      this.itemsFacade.updateItem(item);
    }
  }

  deleteItem(item) {
    this.itemsFacade.deleteItem(item);
  }
}
