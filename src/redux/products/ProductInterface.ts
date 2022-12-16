export interface IProduct {
    id: number;
    title: string;
    description: string;
    discountPercentage: number
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}