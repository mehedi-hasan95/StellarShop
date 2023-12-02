"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import { Product } from "@/type/types";
import { Button } from "../ui/button";
import useCart from "@/hook/useCart";
import { MouseEventHandler } from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/type/types";
import Image from "next/image";
import MiniShoppingProduct from "./MiniShoppingProduct";

interface AddToCartProps {
  data: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const cart = useCart();
  const existingItem = cart.items.find((item) => item.id === data.id);
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem({
      id: data.id,
      images: data.images,
      price: data.price,
      title: data.title,
    });
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger onClick={onAddToCart}>
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {existingItem ? "Added" : "Add to Cart"}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Added Cart</SheetTitle>
            <SheetDescription>
              {cart.items.length === 0 && (
                <div className="flex flex-col items-center md:items-start">
                  <Image src="/empty.jpg" alt="" height={500} width={500} />
                  <p className="text-neutral-500 text-lg">
                    No items added to cart.
                  </p>
                </div>
              )}
              <ul>
                {cart.items.map((item) => (
                  <MiniShoppingProduct key={item.id} data={item} />
                ))}
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddToCart;
