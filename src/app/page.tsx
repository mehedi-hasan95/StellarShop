import SearchBar from "@/components/custom/home/SearchBar";
import ByCategory from "@/components/custom/home/ByCategory";
import CreateAccount from "@/components/custom/home/CreateAccount";
import MainMenu from "@/components/custom/MainMenu";
import Slider from "@/components/custom/Slider";

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
        />
      </div>
    </div>
  );
}
