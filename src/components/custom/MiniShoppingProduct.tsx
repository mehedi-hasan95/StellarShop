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
  const onAllRemove = () => {
    cart.removeAll();
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="relative h-12 w-12 rounded-md overflow-hidden">
          <Image
            fill
            src={data?.images[0]?.url}
            alt=""
            className="object-cover object-center"
          />
        </div>
        <h3>{data.title}</h3>
        <Currency value={data.price} />
        <div>
          <button
            onClick={onRemove}
            className="border rounded-full border-gray-500 p-3"
          >
            <X size={15} />
          </button>
        </div>
      </div>
      <div className="pt-5 flex justify-between">
        <Button asChild>
          <Link href="/cart">Cart</Link>
        </Button>
        <Button variant={"destructive"} onClick={onAllRemove}>
          <Trash className="mr-2 h-4 w-4" />
          Remove All
        </Button>
      </div>
    </div>
  );
};

export default MiniShoppingProduct;
