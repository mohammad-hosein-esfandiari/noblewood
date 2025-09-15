import { ProductType, VariationAttributes } from "./product";


export interface LocalCartItem {
    id: number;
    variation_id?: number | null;
    quantity: number;
    attributes?: VariationAttributes;
}


export interface CartObjectAPI {
    id:string;
    image_url:string;
    price:number;
    total_price:number;
    product_id:number;
    product_name:string;
    product_type: ProductType;
    quantity:number;
    stock_quantity: number | null;
    variation_data:VariationAttributes | []
    variation_id:number | null
}

export interface CartData {
    cart_items:CartObjectAPI[];
    total_items:number;
    total_price:number
}