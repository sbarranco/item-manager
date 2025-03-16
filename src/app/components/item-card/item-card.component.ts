import { Component, input, output } from '@angular/core';
import { Item } from '../../state/models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  imports: [CommonModule],
})
export class ItemCardComponent {
  item = input.required<Item>();
  triggerFavorite = output<Item>();
}
