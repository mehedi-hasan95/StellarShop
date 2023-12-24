export const revalidate = 0;
import Slider from "@/components/custom/Slider";

async function getPopulerData() {
  try {
    const res = await fetch(process.env.BASE_URL + `/user/populer`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}
const PopulerPosts = async () => {
  const data = await getPopulerData();
  return <Slider data={data} className="lg:basis-1/4" />;
};

export default PopulerPosts;
