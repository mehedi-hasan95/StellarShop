import Slider from "../Slider";

const PopulerPosts = () => {
  return (
    <Slider
      apiEndpoint="/api/populer"
      slidesPerView={1}
      spaceBetween={30}
      autoPlay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 25 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      navigation={true}
    />
  );
};

export default PopulerPosts;
