import Link from "next/link";
import Logo from "./Logo";
import MyProfile from "./MyProfile";
import ShoppingCart from "./ShoppingCart";

const MainMenu = () => {
  return (
    <div className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <Logo />
        <Link href="/category">Category</Link>
        <Link href="/products">Products</Link>
      </div>
      <div className="flex gap-2 items-center">
        <ShoppingCart />
        <MyProfile />
      </div>
    </div>
  );
};

export default MainMenu;
