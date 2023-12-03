import { getLatestProductData } from "@/lib/apiData/apiData";
import Slider from "../Slider";

const LatestPosts = async () => {
  const data = await getLatestProductData();
  return <Slider data={data} />;
};

export default LatestPosts;
