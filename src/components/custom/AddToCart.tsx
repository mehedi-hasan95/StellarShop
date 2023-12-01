"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";
import useCart from "@/lib/hook/useCart";
import { Product } from "@/lib/types";

interface ProductCard {
  data: Product;
}
const AddToCart: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart();
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
  return (
    <div>
      <Button onClick={onAddToCart}>
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
