import { getCategoryData } from "@/lib/apiData/apiData";
import Image from "next/image";
import Link from "next/link";

const ByCategory = async () => {
  const data = await getCategoryData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {data?.category?.map((item: any) => (
        <Link
          href={`/category/${item.id}`}
          key={item.id}
          className="flex gap-5 items-center"
        >
          <Image
            src={item.image}
            alt=""
            height={500}
            width={500}
            className="h-20 w-20"
          />
          <div>
            <h4 className="text-lg">{item.name}</h4>
            <p>{item._count.products} Items</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ByCategory;
