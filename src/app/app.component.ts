import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/items.service';
import { Item } from './models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'item-manager';
  itemService = inject(ItemService);

  items: Item[] = [];
  limit = 5;
  offset = 0;
  loading = false;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.itemService.getItems(this.limit, this.offset).subscribe((data) => {
      this.items = [...this.items, ...data.items];
      this.offset += this.limit;
      this.loading = false;
    });
  }
}
