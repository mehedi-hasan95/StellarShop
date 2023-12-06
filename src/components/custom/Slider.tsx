"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import Currency from "./Currency";
import AddToCart from "./AddToCart";
import { Product } from "@/type/types";
import { useEffect, useState } from "react";
import "swiper/css/pagination";
interface SliderProps {
  data: {
    product: Product[];
  };
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
  pagination?: {
    dynamicBullets: boolean;
    clickable: boolean;
  };
  navigation?: boolean;
  autoPlay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
}
const Slider: React.FC<SliderProps> = ({
  data,
  slidesPerView,
  spaceBetween,
  autoPlay,
  breakpoints,
  pagination,
  navigation,
}) => {
  const swiperAutoplayConfig = autoPlay
    ? {
        delay: autoPlay.delay,
        disableOnInteraction: autoPlay.disableOnInteraction ?? false,
      }
    : false;

  // Hydration Error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Swiper
      pagination={pagination}
      navigation={navigation}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={true}
      autoplay={swiperAutoplayConfig}
      breakpoints={breakpoints}
      modules={[Autoplay, Navigation, Pagination]}
      className="mySwiper"
    >
      {data.product.map((item: any) => (
        <div key={item.id}>
          <SwiperSlide>
            <div className="border-2 max-w-max border-gray-400 rounded-lg px-5 py-10">
              <Image
                src={item?.images[0]?.url}
                alt=""
                height={500}
                width={500}
                className="max-h-64"
              />
              <Link
                className="md:text-lg font-bold line-clamp-3"
                href={`/products/${item.slug}`}
              >
                {item.title}
              </Link>
              <div>
                <h4 className="flex flex-col gap-1 pt-5">
                  <div className="flex">
                    Price: <Currency value={item.price} />
                  </div>
                  <div>
                    <AddToCart data={item as Product} />
                  </div>
                </h4>
              </div>
            </div>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};

export default Slider;
