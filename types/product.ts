import type {  CardBrands } from "./brands";
import type { ProductImage } from "./image";

export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  regular_price: string;
  sale_price: string;
  price: string;
  sku: string;
  total_sales: number;
  average_rating: string;
  brands: CardBrands[];
  manage_stock: boolean;
  stock_quantity: number | null;
  images: ProductImage[];
  stock_status: "outofstock" | "instock";
}


export interface RawProduct extends ProductCard {
  [key: string]: any;
}
