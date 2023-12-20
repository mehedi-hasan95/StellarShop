import MyProfile from "@/components/custom/MyProfile";
import Logo from "@/components/custom/Logo";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Map, PlusCircle, Users } from "lucide-react";
import Footer from "@/components/custom/Footer";
import { cn } from "@/lib/utils";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCurrentUser();
  if (data?.role !== "seller" && data?.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Logo />
        <MyProfile />
      </div>
      <Separator />
      <div className="container mx-auto p-4 flex">
        <div className="w-1/4 bg-gray-40 p-4 flex flex-col gap-5 border-r-2">
          <Button asChild variant={"outline"}>
            <Link href="/seller">
              <Home className="mr-2 h-4 w-4" />
              Back to Seller
            </Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href="/seller/myposts">
              <PlusCircle className="mr-2 h-4 w-4" /> My Posts
            </Link>
          </Button>
        </div>

        <div className="w-3/4 p-4">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
