import { http, HttpResponse } from 'msw';
import data from './data.json';

export const handlers = [
  http.get('/api/items', ({ params }) => {
    console.log(HttpResponse.json(data));
    return HttpResponse.json(data);
  }),
];
