import { getPopulerData } from "@/lib/apiData/apiData";
import Slider from "../Slider";

const PopulerPosts = async () => {
  const data = await getPopulerData();
  return (
    <Slider
      data={data}
      autoPlay={{ delay: 2500, disableOnInteraction: false }}
      slidesPerView={1}
      spaceBetween={30}
      pagination={{ clickable: true, dynamicBullets: true }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    />
  );
};

export default PopulerPosts;
