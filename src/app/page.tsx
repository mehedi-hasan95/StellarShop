import SearchBar from "@/components/custom/home/SearchBar";
import ByCategory from "@/components/custom/home/ByCategory";
import CreateAccount from "@/components/custom/home/CreateAccount";
import MainMenu from "@/components/custom/MainMenu";
import Trending from "@/components/custom/home/Trending";
import PopulerPosts from "@/components/custom/home/PopulerPosts";
import LatestPosts from "@/components/custom/home/LatestPosts";
import Footer from "@/components/custom/Footer";
import SkeletonLoder from "@/components/custom/SkeletonLoder";
import Image from "next/image";
import Link from "next/link";

async function getCategoryData() {
  try {
    const res = await fetch(process.env.BASE_URL + `/admin/category`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
export default async function Home() {
  const data = await getCategoryData();
  console.log(data);
  return (
    <div>
      <MainMenu />
      <SearchBar />
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-bold py-10">Search by Category:</h2>
        {/* Category data  */}
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
        {/* Category data  */}
      </div>
      <CreateAccount />
      {/* <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-bold py-2 border-b-2 border-emerald-500 max-w-max mb-5">
          Our Populer Products
        </h2>
        <PopulerPosts />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-bold py-2 border-b-2 border-emerald-500 max-w-max mb-5">
          Our Tending product:
        </h2>
        <Trending />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-bold py-2 border-b-2 border-emerald-500 max-w-max mb-5">
          Our Latest product:
        </h2>
        <LatestPosts />
      </div> */}
      <Footer />
    </div>
  );
}
