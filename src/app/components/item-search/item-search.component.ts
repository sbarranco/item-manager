import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  output,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ItemSearchComponent implements OnInit {
  searchItems = output<string>();
  resetSearch = output<void>();

  search = new FormControl<string>('', [Validators.maxLength(120)]);

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query !== null && query.trim() !== '') {
          this.searchItems.emit(query);
        } else {
          this.resetSearch.emit();
        }
      });
  }

  onClickResetSearch(): void {
    this.search.reset();
    this.resetSearch.emit();
  }
}
