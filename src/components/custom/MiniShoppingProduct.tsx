"use client";
import Currency from "@/components/custom/Currency";
import useCart from "@/hook/useCart";
import { Product } from "@/type/types";
import { Trash, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface CartItemProps {
  data: Product;
}

const MiniShoppingProduct: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <div className="flex gap-2 w-full">
          <div className="relative flex h-12 w-1/6 rounded-md overflow-hidden">
            <Image
              fill
              src={data?.images[0]?.url}
              alt=""
              className="object-cover object-center"
            />
          </div>
          <div className="flex w-5/6 flex-col gap-y-1">
            <h3>{data.title}</h3>
            <Currency value={data.price} />
          </div>
        </div>
        <div>
          <button
            onClick={onRemove}
            className="border rounded-full border-gray-500 p-1"
          >
            <X size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniShoppingProduct;
