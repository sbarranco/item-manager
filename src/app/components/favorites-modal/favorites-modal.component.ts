import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Item } from '../../state/models/item.model';
import { AppFacade } from '../../state/facades/app.facade';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss'],
  imports: [CommonModule],
})
export class FavoritesModalComponent {
  isOpen = input<boolean>(false);
  closeModal = output<void>();

  private appFacade = inject(AppFacade);

  favorites$ = this.appFacade.favoriteItems$;

  onDeleteFavorites(item: Item): void {
    this.appFacade.deleteFavoriteItem(item);
  }
}
