export interface IProduct {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsState {
  products: IProduct[] | [];
  filteredProduct: IProduct[] | [];
  status: 'idle' | 'loading' | 'failed';
  isFilter: boolean;
  initMaxPrice: number;
  initMaxStock: number;
  minPrice: number;
  maxPrice: number;
  minStock: number;
  maxStock: number;
}

export interface ISort {
  type: string;
  action: 'price' | 'rating' | 'discountPercentage';
}

export interface IFilter {
  categories: string[];
  brands: string[];
  price: number[];
  stock: number[];
  search: string
}
