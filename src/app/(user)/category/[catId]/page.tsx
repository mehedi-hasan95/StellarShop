export const revalidate = 0;
import Image from "next/image";
import NotFound from "@/app/(user)/category/not-found";
import Card from "@/components/custom/Card";

async function getSingleCatData(id: string) {
  const res = await fetch(process.env.BASE_URL + `/admin/category/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const CatId = async ({ params }: { params: { catId: string } }) => {
  const data = await getSingleCatData(params.catId);
  if (data?.category?.length) {
    return (
      <div className="container mx-auto p-4">
        {data?.category[0]?.billboard.length ? (
          <div className="relative">
            <Image
              src={data?.category[0]?.billboard[0]?.image}
              alt=""
              height={500}
              width={500}
              className="h-full lg:h-96 w-full z-10"
            />
            <h3 className="absolute top-1/2 left-1/2 z-20 text-white -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
              {data?.category[0]?.billboard[0]?.label}
            </h3>
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <Card data={data.category[0]} />
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default CatId;
