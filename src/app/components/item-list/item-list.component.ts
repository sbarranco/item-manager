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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ItemCardComponent],
})
export class ItemListComponent implements OnInit {
  @HostBinding('class') class = 'app-item-list';
  private AppFacade = inject(AppFacade);

  loading$ = this.AppFacade.loading$;
  items$ = this.AppFacade.items$;

  showMoreFilters = signal(false);
  hasMoreItems = signal(false);
  pagination = signal<Pagination>({
    limit: 5,
    offset: 0,
  });

  searchForm: FormGroup = new FormGroup({
    searchPrompt: new FormControl('', [Validators.maxLength(120)]),
  });

  filterForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.maxLength(120)]),
    price: new FormControl('', [Validators.pattern(/^\d+$/)]),
    email: new FormControl('', [Validators.email]),
  });

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
    console.log('Searching for:', this.searchForm.value);
    console.log('Searching for:', this.filterForm.value);
    this.searchForm.get('searchPrompt')!.markAsTouched();
    if (this.searchForm.invalid) {
      return;
    } else {
      this.AppFacade.searchItems(this.searchForm.value);
    }
  }

  onClickShowMoreFilters(): void {
    this.showMoreFilters.set(!this.showMoreFilters());
  }

  onTriggerFavorite(item: Item): void {
    console.log('Favorite item:', item);
  }
}
