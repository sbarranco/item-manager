import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppFacade } from '../../state/facades/app.facade';
import { Item, Pagination } from '../../state/models/item.model';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ItemCardComponent],
})
export class ItemListComponent implements OnInit {
  @HostBinding('class') class = 'app-item-list';
  private AppFacade = inject(AppFacade);

  loading$ = this.AppFacade.loading$;
  items$ = this.AppFacade.items$;

  hasMoreItems = signal(false);
  pagination = signal<Pagination>({
    limit: 5,
    offset: 0,
  });

  search = new FormControl<string>('', [Validators.maxLength(120)]);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.AppFacade.loadItems(this.pagination());
  }

  onScroll(): void {
    this.pagination.set({
      limit: this.pagination().limit,
      offset: this.pagination().offset + this.pagination().limit,
    });
    this.loadItems();
  }

  onClickSearchItems(): void {
    if (this.search.invalid) {
      return;
    } else {
      const query = this.search.value;
      if (query !== null) {
        this.AppFacade.searchItems(query);
      }
    }
  }

  onTriggerFavorite(item: Item): void {
    this.AppFacade.addFavoriteItem(item);
  }
}
