import { http, HttpResponse } from 'msw';
import data from './data.json';

export const handlers = [
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('_limit') || '5', 10);
    const offset = parseInt(url.searchParams.get('_start') || '0', 10);
    const paginatedItems = data.items.slice(offset, offset + limit);
    return HttpResponse.json({ items: paginatedItems });
  }),

  http.get('/api/items/filter', ({ request }) => {
    const url = new URL(request.url);
    const filters = Object.fromEntries(url.searchParams.entries());
    const filteredItems = data.items.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        return (
          (item as Record<string, any>)[key] &&
          (item as Record<string, any>)[key].toString().includes(value)
        );
      });
    });
    return HttpResponse.json({ items: filteredItems });
  }),
];
