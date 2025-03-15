import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ItemSearchComponent {
  searchItems = output<string>();
  resetSearch = output<void>();

  search = new FormControl<string>('', [Validators.maxLength(120)]);

  onClickSearchItems(): void {
    if (this.search.invalid) {
      return;
    } else {
      const query = this.search.value;
      if (query !== null) {
        this.searchItems.emit(query);
      }
    }
  }

  onClickResetSearch(): void {
    this.search.reset();
    this.resetSearch.emit();
  }
}
