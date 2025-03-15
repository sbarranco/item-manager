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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppFacade } from '../../state/facades/app.facade';
import { Item, Pagination } from '../../state/models/item.model';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ItemCardComponent],
})
export class ItemListComponent implements OnInit, AfterViewInit {
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

  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
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

  onClickResetSearch(): void {
    this.search.reset();
    this.pagination.set({
      limit: 5,
      offset: 0,
    });
    this.loadItems();
  }

  onTriggerFavorite(item: Item): void {
    this.AppFacade.addFavoriteItem(item);
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.onScroll();
      }
    });
    this.observer.observe(this.scrollAnchor.nativeElement);
  }
}
