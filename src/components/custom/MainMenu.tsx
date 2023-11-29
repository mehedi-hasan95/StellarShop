import Link from "next/link";
import Logo from "./Logo";
import MyProfile from "./MyProfile";

const MainMenu = () => {
  return (
    <div className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <Logo />
        <Link href="/category">Category</Link>
        <Link href="/products">Products</Link>
      </div>
      <MyProfile />
    </div>
  );
};

export default MainMenu;
