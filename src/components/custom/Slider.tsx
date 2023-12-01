"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import useSWR from "swr";
import Image from "next/image";

interface ProductProps {
  id: string;
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
}
const Slider: React.FC<SliderProps> = ({
  apiEndpoint,
  slidesPerView,
  spaceBetween,
  autoPlay,
  breakpoints,
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
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        breakpoints={breakpoints}
        loop={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        autoplay={swiperAutoplayConfig}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data?.product?.map((item) => (
          <p key={item.id}>
            <SwiperSlide>
              <Image src={item.images[0].url} alt="" height={500} width={500} />
            </SwiperSlide>
          </p>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
