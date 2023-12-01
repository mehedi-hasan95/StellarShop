"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import AddToCart from "./AddToCart";
interface ProductProps {
  id: string;
  title: string;
  price: string;
  images: { url: string }[];
}

interface SliderProps {
  apiEndpoint: string;
  slidesPerView: number;
  spaceBetween: number;
  autoPlay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
  pagination?: {
    dynamicBullets: boolean;
    clickable: boolean;
  };
  navigation?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  apiEndpoint,
  slidesPerView,
  spaceBetween,
  autoPlay,
  breakpoints,
  pagination,
  navigation,
}) => {
  const { data } = useSWR<{ product: ProductProps[] }>(apiEndpoint);
  const swiperAutoplayConfig = autoPlay
    ? {
        delay: autoPlay.delay,
        disableOnInteraction: autoPlay.disableOnInteraction ?? false,
      }
    : false;
  return (
    <div>
      <Swiper
        pagination={pagination}
        navigation={navigation}
        breakpoints={breakpoints}
        loop={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        autoplay={swiperAutoplayConfig}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {data?.product?.map((item) => (
          <div key={item.id}>
            <SwiperSlide>
              <div className="border-2 border-gray-400 rounded-lg px-5 py-10">
                <Image
                  src={item.images[0].url}
                  alt=""
                  height={500}
                  width={500}
                  className="max-h-64"
                />
                <Link
                  className="text-xl font-bold"
                  href={`/products/${item.id}`}
                >
                  {item.title}
                </Link>
                <div>
                  <h4 className="flex flex-col gap-1 pt-5">
                    <div className="flex">
                      Price:{" "}
                      <span className="flex items-center">
                        <DollarSign />
                        {item.price}
                      </span>
                    </div>
                    <div>
                      <AddToCart data={item as any} />
                    </div>
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
