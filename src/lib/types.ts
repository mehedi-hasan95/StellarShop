import { Category, Image } from "@prisma/client";

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  images: Image[];
}
