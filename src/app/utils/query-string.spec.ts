import { toQueryString } from './query-string.util';

describe('toQueryString', () => {
  it('should convert an object to a query string', () => {
    const params = {
      title: 'Item 1',
      description: 'Description 1',
      price: 100,
      email: 'test@example.com',
    };
    const queryString = toQueryString(params);
    expect(queryString).toBe(
      'title=Item%201&description=Description%201&price=100&email=test%40example.com'
    );
  });

  it('should handle empty object', () => {
    const params = {};
    const queryString = toQueryString(params);
    expect(queryString).toBe('');
  });

  it('should handle special characters', () => {
    const params = {
      title: 'Item & 1',
      description: 'Description / 1',
      price: 100,
      email: 'test@example.com',
    };
    const queryString = toQueryString(params);
    expect(queryString).toBe(
      'title=Item%20%26%201&description=Description%20%2F%201&price=100&email=test%40example.com'
    );
  });

  it('should handle undefined and null values', () => {
    const params = {
      title: 'Item 1',
      description: null,
      price: undefined,
      email: 'test@example.com',
    };
    const queryString = toQueryString(params);
    expect(queryString).toBe(
      'title=Item%201&description=null&price=undefined&email=test%40example.com'
    );
  });
});
