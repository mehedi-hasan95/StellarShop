import Slider from "@/components/custom/Slider";

async function getLatestProductData() {
  const res = await fetch(process.env.BASE_URL + `/user/latest`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
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
