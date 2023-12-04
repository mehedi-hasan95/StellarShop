import { getSingleCatData } from "@/lib/apiData/apiData";
import Image from "next/image";
import Link from "next/link";
import NotFound from "../not-found";
import Card from "@/components/custom/Card";

const CatId = async ({ params }: { params: { catId: string } }) => {
  const data = await getSingleCatData(params.catId);
  if (data.category.length) {
    return (
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card data={data.category[0]} />
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default CatId;
