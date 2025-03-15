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
    const search = url.searchParams.get('search') || '';
    const filteredItems = data.items.filter((item) => {
      return (
        item.title.toString().includes(search) ||
        item.description.toString().includes(search) ||
        item.price.toString().includes(search) ||
        item.email.toString().includes(search)
      );
    });
    return HttpResponse.json({ items: filteredItems });
  }),
];
