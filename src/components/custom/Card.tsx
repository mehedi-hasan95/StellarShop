"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Expand, Heart, MessagesSquare, Share2, ThumbsUp } from "lucide-react";
import AddToCart from "./AddToCart";
import Currency from "./Currency";
import { useEffect, useState } from "react";

interface CardProps {
  data: {
    products: ProductProps[];
  };
}

interface ProductProps {
  id: string;
  title: string;
  images: { url: string }[];
  price: string;
}
const Card: React.FC<CardProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      {props.data.products.map((item) => (
        <div
          key={item.id}
          className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100"
        >
          <div className="relative group">
            <Image
              src={item.images[0].url}
              alt=""
              height={500}
              width={500}
              className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500 group-hover:opacity-50"
            />
            <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
              <div className="flex gap-x-6 justify-center">
                <Button>
                  <Expand size={20} />
                </Button>
                <AddToCart data={item as any} />
              </div>
            </div>
          </div>
          <div className="py-5">
            <Link
              className="text-xl font-semibold"
              href={`/products/${item.id}`}
            >
              {item.title}
            </Link>
            <h2 className="flex gap-1">
              <span>Price:</span> <Currency value={item.price} />
            </h2>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="space-x-2">
              <Button variant={"ghost"}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>10</span>
              </Button>
              <Button variant={"ghost"}>
                <Heart className="mr-2 h-4 w-4" />
                <span>30</span>
              </Button>
            </div>
            <div className="flex space-x-2 text-sm dark:text-gray-400">
              <Button variant={"ghost"}>
                <MessagesSquare className="mr-2 h-4 w-4" />
                <span>200</span>
              </Button>
              <Button variant={"ghost"}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                <span>200</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
