import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { ItemListComponent } from './components/item-list/item-list.component';
import { FavoritesModalComponent } from './components/favorites-modal/favorites-modal.component';
import { AppFacade } from './state/facades/app.facade';
import { Item } from './state/models/item.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ItemListComponent, FavoritesModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'item-manager';
  @HostBinding('class') class = 'app-root';

  isFavoritesModalOpen = signal(false);

  openFavoritesModal(): void {
    this.isFavoritesModalOpen.set(!this.isFavoritesModalOpen());
  }
}
