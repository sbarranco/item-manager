export interface Item {
  title: string;
  description: string;
  price: number;
  email: string;
  image: string;
}

export interface Pagination {
  limit: number;
  start: number;
}
