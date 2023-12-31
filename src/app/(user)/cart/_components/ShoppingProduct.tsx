"use client";
import Currency from "@/components/custom/Currency";
import useCart from "@/hook/useCart";
import { Product } from "@/type/types";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  data: Product;
}

const ShoppingProduct: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center overflow-hidden w-full">
        <div className="relative flex h-24 w-1/3 rounded-md overflow-hidden sm:h-48 sm:w-48">
          <Image
            fill
            src={data?.images[0]?.url}
            alt=""
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col w-2/3">
          <h3 className="text-xl">{data.title}</h3>
          <Currency value={data.price} />
        </div>
      </div>
      <div>
        <button
          onClick={onRemove}
          className="border rounded-full border-gray-500 p-3"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};

export default ShoppingProduct;
