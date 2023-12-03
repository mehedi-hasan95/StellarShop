import { getLatestProductData } from "@/lib/apiData/apiData";
import Slider from "../Slider";

const LatestPosts = async () => {
  const data = await getLatestProductData();
  return (
    <Slider
      autoPlay={{ delay: 3000, disableOnInteraction: true }}
      data={data}
      navigation={true}
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    />
  );
};

export default LatestPosts;
