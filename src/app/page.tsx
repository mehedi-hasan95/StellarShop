import SearchBar from "@/components/custom/home/SearchBar";
import ByCategory from "@/components/custom/home/ByCategory";
import CreateAccount from "@/components/custom/home/CreateAccount";
import MainMenu from "@/components/custom/MainMenu";
import Trending from "@/components/custom/home/Trending";
import PopulerPosts from "@/components/custom/home/PopulerPosts";
import LatestPosts from "@/components/custom/home/LatestPosts";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <div>
      <MainMenu />
      <SearchBar />
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-bold py-10">Search by Category:</h2>
        <ByCategory />
      </div>
      <CreateAccount />
      <div className="container mx-auto p-4">
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
      </div>
      <Footer />
    </div>
  );
}
