import Slider from "../Slider";

const LatestPosts = () => {
  return (
    <Slider
      apiEndpoint="/api/latest"
      slidesPerView={1}
      spaceBetween={30}
      autoPlay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 25 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
      }}
      pagination={{ clickable: true, dynamicBullets: true }}
    />
  );
};

export default LatestPosts;
