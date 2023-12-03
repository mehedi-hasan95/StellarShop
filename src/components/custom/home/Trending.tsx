import { getTrendingData } from "@/lib/apiData/apiData";
import Image from "next/image";
import Link from "next/link";

interface TrendingProps {
  id: string;
  images: { url: string }[];
  title: string;
  user: {
    image: string;
    name: string;
  };
  slug: string;
}
const Trending = async () => {
  const data = await getTrendingData();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6">
      {data.product.map((item: TrendingProps, index: number) => (
        <div
          key={item.id}
          className="relative group overflow-hidden first:lg:row-span-2 first:lg:col-span-2"
        >
          <Image
            src={item.images[0].url}
            alt=""
            height={500}
            width={500}
            className="h-full w-full group-hover:scale-110 transition duration-200 ease-in-out z-10"
          />
          <div className="absolute z-20 inset-0 bg-black opacity-50 group-hover:opacity-30 transition duration-200 ease-in-out"></div>
          <div className="absolute z-30 bottom-10 left-10">
            <Link
              href={`/products/${item.id}`}
              className={`text-xl md:text-2xl font-semibold text-white pb-2 md:pb-5 capitalize`}
            >
              {item.title}
            </Link>
            <div className="flex gap-5 items-center text-white pt-2">
              <div className="flex gap-2 items-center">
                <Image
                  src={item.user.image}
                  alt=""
                  height={500}
                  width={500}
                  className="h-10 w-10 rounded-full"
                />
                {item.user.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trending;
