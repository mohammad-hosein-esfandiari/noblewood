export interface Brand {
    id: number;
    name: string;
    slug: string;
    count: number;
    description: string;
  }
  
 export  interface RawBrand {
    id: number;
    name: string;
    slug: string;
    count: number;
    description: string;
    [key: string]: any; // سایر فیلدها را نادیده می‌گیریم
  }

 export type CardBrands = Pick<Brand , "id" | "name" | "slug">