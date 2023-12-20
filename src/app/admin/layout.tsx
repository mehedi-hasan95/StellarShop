import MyProfile from "@/components/custom/MyProfile";
import Logo from "@/components/custom/Logo";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

import Footer from "@/components/custom/Footer";
import getCurrentUser from "@/actions/getCurrentUser";
import AdminMenu from "./_components/AdminMenu";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCurrentUser();
  if (data?.role !== "admin") {
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
        <div className="w-1/4 bg-gray-40 p-4 flex flex-col gap-5">
          <AdminMenu />
        </div>
        <Separator orientation="vertical" />
        <div className="w-3/4 p-4">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
