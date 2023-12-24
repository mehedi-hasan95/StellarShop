"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Currency from "./Currency";
import AddToCart from "./AddToCart";
import { Product } from "@/type/types";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

interface SliderProps {
  data: {
    product: Product[];
  };
  className?: string;
}
const Slider: React.FC<SliderProps> = ({ data, className }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {data.product.map((item) => (
          <CarouselItem
            key={item.id}
            className={cn(`md:basis-1/2 lg:basis-1/3 flex flex-col`, className)}
          >
            <div className="border-2 flex-1 rounded-md">
              <Image src={item.images[0].url} alt="" height={500} width={500} />
              <div className="px-3 py-5">
                <h2 className="md:text-md font-bold">{item.title}</h2>
                <h2 className="flex gap-x-1 py-2">
                  Price: <Currency value={item.price} />
                </h2>
                <AddToCart data={item} />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
