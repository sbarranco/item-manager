import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ScrollService } from '../../services/scroll/scroll.service';
import { AppFacade } from '../../state/facades/app.facade';
import { Item, Pagination } from '../../state/models/item.model';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemSearchComponent } from '../item-search/item-search.component';

const INITIAL_PAGINATION: Pagination = {
  limit: 5,
  start: 0,
};

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  imports: [CommonModule, ItemCardComponent, ItemSearchComponent],
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'app-item-list';
  private appFacade = inject(AppFacade);
  private scrollService = inject(ScrollService);

  loading$ = this.appFacade.loading$;
  items$ = this.appFacade.items$;

  initialLoadDone = signal(false);
  isSearchActive = signal(false);
  pagination = signal<Pagination>(INITIAL_PAGINATION);

  search = new FormControl<string>('', [Validators.maxLength(120)]);

  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit(): void {
    this.scrollService.setupIntersectionObserver(this.scrollAnchor, () =>
      this.onScroll()
    );
  }

  ngOnDestroy(): void {
    this.scrollService.disconnectObserver();
  }

  loadItems(): void {
    this.appFacade.loadItems(this.pagination());
  }

  onScroll(): void {
    if (!this.initialLoadDone()) {
      this.initialLoadDone.set(true);
      return;
    }
    if (this.isSearchActive()) {
      return;
    }
    this.pagination.set({
      limit: this.pagination().limit,
      start: this.pagination().start + this.pagination().limit,
    });
    this.loadItems();
  }

  onClickSearchItems(query: string): void {
    this.initialLoadDone.set(false);
    this.isSearchActive.set(true);
    this.appFacade.searchItems(query);
  }

  onClickResetSearch(): void {
    this.pagination.set(INITIAL_PAGINATION);
    this.isSearchActive.set(false);
    this.loadItems();
  }

  onTriggerFavorite(item: Item): void {
    this.appFacade.addFavoriteItem(item);
  }
}
