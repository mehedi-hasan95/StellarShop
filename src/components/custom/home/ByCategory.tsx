"use client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

// async function getCategoryData() {
//   try {
//     const res = await fetch(process.env.BASE_URL + `/admin/category`);

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return res.json();
//   } catch (error) {
//     console.error(error);
//   }
// }
const ByCategory = () => {
  const { data, isLoading } = useSWR(`${process.env.BASE_URL}/admin/category`);
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
      {data?.category?.map((item: any) => (
        <Link
          href={`/category/${item.slug}`}
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
