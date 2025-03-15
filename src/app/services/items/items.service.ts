import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../state/models/item.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getItems(limit: number, start: number): Observable<{ items: Item[] }> {
    return this.http.get<{ items: Item[] }>(
      `${this.apiUrl}?_limit=${limit}&_start=${start}`
    );
  }

  searchItems(query: string): Observable<{ items: Item[] }> {
    return this.http.get<{ items: Item[] }>(
      `${this.apiUrl}/filter?search=${query.toLowerCase()}`
    );
  }
}
