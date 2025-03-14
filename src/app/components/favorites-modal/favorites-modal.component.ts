import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Item } from '../../state/models/item.model';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss'],
  imports: [CommonModule],
})
export class FavoritesModalComponent {
  favorites = input<Array<Item>>();
  isOpen = input<boolean>(false);
  closeModal = output<void>();
  deleteFromFavorites = output<Item>();
}
