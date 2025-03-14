import { toQueryString } from './query-string.util';

describe('toQueryString', () => {
  it('should convert an object to a query string', () => {
    const params = 'test@example.com';
    const queryString = toQueryString(params);
    expect(queryString).toBe('test%40example.com');
  });

  it('should handle empty object', () => {
    const params = '';
    const queryString = toQueryString(params);
    expect(queryString).toBe('');
  });

  it('should handle special characters', () => {
    const params = 'Item & 1';
    const queryString = toQueryString(params);
    expect(queryString).toBe('Item%20%26%201');
  });
});
