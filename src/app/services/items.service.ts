import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly apiUrl = '/api/items';
  private readonly http = inject(HttpClient);

  getItems(limit: number, offset: number): Observable<{ items: Item[] }> {
    return this.http.get<{ items: Item[] }>(
      `${this.apiUrl}?_limit=${limit}&_start=${offset}`
    );
  }
}
