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

  http.get('/api/items/filter', ({ params }) => {
    const filters = params || {};
    const filteredItems = data.items.filter((item: { [key: string]: any }) => {
      let isValid = true;
      Object.entries(filters).forEach(([key, value]) => {
        if (item[key as keyof typeof item] !== value) {
          isValid = false;
        }
      });
      return isValid;
    });
    return HttpResponse.json({ items: filteredItems });
  }),
];
