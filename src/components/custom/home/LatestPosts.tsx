import Slider from "@/components/custom/Slider";

async function getLatestProductData() {
  try {
    const res = await fetch(process.env.BASE_URL + `/user/latest`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}
const LatestPosts = async () => {
  const data = await getLatestProductData();
  return <Slider data={data} className="lg:basis-1/3" />;
};

export default LatestPosts;
