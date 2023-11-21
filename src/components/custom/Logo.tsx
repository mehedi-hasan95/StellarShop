import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image
        src="/logo.svg"
        alt="stellarShop"
        height={500}
        width={500}
        className="h-7 w-7"
      />
      <h2 className="text-xl font-bold">StellerShop</h2>
    </Link>
  );
};

export default Logo;
