// "use client";
import Image from "next/image";
import Link from "next/link";
import { getProductsData } from "@/lib/apiData/apiData";

const MyPosts = async () => {
  const data = await getProductsData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {data?.products?.map((item: any) => (
        <div key={item.id}>
          <Image src={item.images[0].url} alt="" height={500} width={500} />
          <Link
            href={`/seller/myposts/${item.id}`}
            className="text-2xl font-semibold"
          >
            {item.title}
          </Link>
          <p>{item.short_desc}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
