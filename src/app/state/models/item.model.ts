export interface Item {
  title: string;
  description: string;
  price: number;
  email: string;
  image: string;
  isFavorite?: boolean;
}

export interface Pagination {
  limit: number;
  start: number;
}
