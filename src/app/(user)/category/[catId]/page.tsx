import { getSingleCatData } from "@/lib/apiData/apiData";
import Image from "next/image";
import Link from "next/link";
import NotFound from "../not-found";

const CatId = async ({ params }: { params: { catId: string } }) => {
  const data = await getSingleCatData(params.catId);

  if (data.category.length) {
    return (
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.category[0]?.Products?.map((item: any) => (
          <div key={item.id}>
            <Image
              src={item.images[0].url}
              alt=""
              height={500}
              width={500}
              className="max-h-72"
            />
            <div className="py-5">
              <Link
                className="text-xl font-semibold"
                href={`/products/${item.id}`}
              >
                {item.title}
              </Link>
              <p>{item.short_desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default CatId;
