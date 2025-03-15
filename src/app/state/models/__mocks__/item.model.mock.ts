import { Item } from '../item.model';

export function createMockItem(): Item {
  return {
    title: 'Item 1',
    description: 'Description 1',
    price: 100,
    email: 'test@example.com',
    image: 'image1.jpg',
  };
}

export function createMockItemList(): Item[] {
  return [
    {
      title: 'Item 1',
      description: 'Description 1',
      price: 100,
      email: 'test@example.com',
      image: 'image1.jpg',
    },
    {
      title: 'Item 2',
      description: 'Description 2',
      price: 200,
      email: 'test2@example.com',
      image: 'image2.jpg',
    },
  ];
}
