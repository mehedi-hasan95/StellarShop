import { Image } from "@prisma/client";

export interface Product {
  id: string;
  title: string;
  price: string;
  images: Image[];
}
