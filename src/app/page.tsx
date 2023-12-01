import SearchBar from "@/components/custom/home/SearchBar";
import ByCategory from "@/components/custom/home/ByCategory";
import CreateAccount from "@/components/custom/home/CreateAccount";
import MainMenu from "@/components/custom/MainMenu";
import Slider from "@/components/custom/Slider";
import Trending from "@/components/custom/home/Trending";

export default function Home() {
  return (
    <div>
      <MainMenu />
      <SearchBar />
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-bold py-10">Search by Category</h2>
        <ByCategory />
      </div>
      <CreateAccount />
      <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-bold py-10">
          Our Populer Products
        </h2>
        <Slider
          apiEndpoint="/api/populer"
          slidesPerView={1}
          spaceBetween={30}
          autoPlay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          navigation={true}
        />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-bold py-2 border-b-2 border-emerald-500 max-w-max">
          Our Tending product:
        </h2>
        <Trending />
      </div>
    </div>
  );
}
