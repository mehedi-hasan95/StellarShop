"use client";

// import { Product } from "@/type/types";
import { Button } from "../ui/button";
import useCart from "@/hook/useCart";
import { MouseEventHandler } from "react";
import { Products } from "@prisma/client";
import { ShoppingBag } from "lucide-react";

interface AddToCartProps {
  data: Products;
}

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const cart = useCart();
  const existingItem = cart.items.find((item) => item.id === data.id);
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
  return (
    <div>
      <Button onClick={onAddToCart}>
        <ShoppingBag className="mr-2 h-4 w-4" />
        {existingItem ? "Added" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCart;
