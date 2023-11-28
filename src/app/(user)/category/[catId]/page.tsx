import { getSingleCatData } from "@/lib/apiData/apiData";

const CatId = async ({ params }: { params: { catId: string } }) => {
  const data = await getSingleCatData(params.catId);
  console.log(data);
  return <div className="container mx-auto p-4">Mehedi</div>;
};

export default CatId;
