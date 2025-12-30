export interface Category {
  id: string;
  name: string;
}

export interface Device {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
}

export type SortOption = "name" | "price" | "rating" | "category";
export type SortDirection = "asc" | "desc";
