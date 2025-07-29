export interface Category {
    id: number;
    name: string;
    slug: string;
    parent: number;
    count: number;
    image: string | null;
    description: string;
    children: Category[]; // recursive structure
  }
  