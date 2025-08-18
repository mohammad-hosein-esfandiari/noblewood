import type {  CardBrands } from "./brands";
import type { ProductImage } from "./image";
interface Option {
  label: string;
  value: string;
}

// اینترفیس برای ویژگی‌ها (Attributes)
interface Attribute {
  title: string;
  slug: string;
  options: Option[];
}

// اینترفیس برای ویژگی‌های یک Variation
interface VariationAttributes {
  pa_wood_brand: string;
  pa_wooden_bowls_size: string;
}

// اینترفیس برای هر Variation
interface Variation {
  id: number;
  price: number;
  stock: number;
  image: string;
  attributes: VariationAttributes;
}

// اینترفیس کلی داده‌ها
interface ProductVariationsData {
  variations: Variation[];
  attributes: Attribute[];
}
export interface Category {
  id:number ;
  name:string;
  slug:string
}
export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  date_created: string;
  date_modified: string;
  type: "simple" | "variable";
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
  attributes:ProductVariationsData 
  categories :Category[];
  rating_count : number
}


export interface RawProduct extends ProductCard {
  [key: string]: any;
}
