import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ItemListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'item-manager';
}
