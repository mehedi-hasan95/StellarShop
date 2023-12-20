"use client";
import { useEffect, useState } from "react";
import ShoppingProduct from "./_components/ShoppingProduct";
import useCart from "@/hook/useCart";
import Summary from "./_components/Summery";
import Image from "next/image";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold py-10">
        Shopping Cart
      </h2>
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-x-12 gay-y-12">
        <div className="md:col-span-7">
          {cart?.items?.length === 0 && (
            <div className="flex flex-col items-center md:items-start">
              <Image src="/empty.jpg" alt="" height={500} width={500} />
              <p className="text-neutral-500 text-lg">
                No items added to cart.
              </p>
            </div>
          )}
          <ul>
            {cart?.items?.map((item) => (
              <ShoppingProduct key={item.id} data={item} />
            ))}
          </ul>
        </div>
        <div className="md:col-span-5">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
