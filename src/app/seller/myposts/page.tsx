// "use client";
import Image from "next/image";
import Link from "next/link";
import { getProductsData } from "@/lib/apiData/apiData";

const MyPosts = async () => {
  const data = await getProductsData();
  return (
    <div>
      {data?.products?.map((item: any) => (
        <div key={item.id}>
          <Image src={item.image} alt="" height={500} width={500} />
          <Link href={`/seller/myposts/${item.id}`}>{item.title}</Link>
          <p>{item.short_desc}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
