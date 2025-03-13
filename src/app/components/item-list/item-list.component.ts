import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { ItemService } from '../../services/items.service';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  imports: [CommonModule],
})
export class ItemListComponent implements OnInit {
  @HostBinding('class') class = 'app-item-list';
  private itemService = inject(ItemService);

  items: Item[] = [];

  limit = 5;
  offset = 0;
  isLoading = false;
  hasMoreItems = true;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems(this.limit, this.offset).subscribe((data) => {
      this.items = [...this.items, ...data.items];
      this.offset += this.limit;
      this.hasMoreItems = data.items.length === this.limit;
      this.isLoading = false;
    });
  }

  onScroll(): void {
    if (!this.isLoading) {
      this.loadItems();
    }
  }

  selectItem(item: Item): void {
    console.log('Selected item:', item);
  }
}
