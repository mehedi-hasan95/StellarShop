import Logo from "@/components/custom/Logo";
import MyProfile from "@/components/custom/MyProfile";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Logo />
          <Link href="/category">Category</Link>
        </div>
        <MyProfile />
      </div>
      {children}
    </div>
  );
}
