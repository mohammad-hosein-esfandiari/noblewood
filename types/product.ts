import type { CardBrands } from "./brands";
import type { ProductImage } from "./image";
export interface AttributeOption {
  label: string;
  value: string;
}

// اینترفیس برای ویژگی‌ها (Attributes)
export interface Attribute {
  title: string;
  slug: string;
  options: AttributeOption[];
}

// اینترفیس برای ویژگی‌های یک Variation
export interface VariationAttributes {
  [key: string]: string;
}

// اینترفیس برای هر Variation
export interface Variation {
  id: number;
  regular_price: number | null;
  sale_price: number | null;
  stock_status: StockStatusType;
  stock: number;
  image: string;
  attributes: VariationAttributes;
  dimensions: DimensionsType;
  weight: string;
}

// اینترفیس کلی داده‌ها
export interface ProductVariationsData {
  variations: Variation[];
  attributes: Attribute[];
}
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export type ProductType = "simple" | "variable";

export type StockStatusType = "outofstock" | "instock";

export interface DimensionsType {
  length: string;
  width: string;
  height: string;
}

export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  date_created: string;
  date_modified: string;
  type: ProductType;
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
  stock_status: StockStatusType;
  attributes: ProductVariationsData;
  categories: Category[];
  rating_count: number;
  dimensions: DimensionsType;
  short_description: string;
  description: string;
  weight: string;
}

export interface RawProduct extends ProductCard {
  [key: string]: any;
}
