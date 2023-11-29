import SearchBar from "@/components/custom/home/SearchBar";
import ByCategory from "@/components/custom/home/ByCategory";
import CreateAccount from "@/components/custom/home/CreateAccount";
import MainMenu from "@/components/custom/MainMenu";

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
    </div>
  );
}
