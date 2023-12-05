import prismadb from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

async function getData() {
  const session = await getAuthSession();
  return await prismadb.products.findMany({
    where: {
      sellerId: session?.user.id,
    },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
const MyPosts = async () => {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl lg:text-2xl font-bold">
          Your Products ({data?.length})
        </h2>
        <Button asChild>
          <Link href="/seller/myposts/new">
            <PenSquare className="mr-2 h-4 w-4" />
            Create
          </Link>
        </Button>
      </div>
      <div className="py-10">
        <Separator className={cn("bg-emerald-600")} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data?.map((item: any) => (
          <div key={item.id}>
            <Image src={item?.images[0]?.url} alt="" height={500} width={500} />
            <Link
              href={`/seller/myposts/${item.slug}`}
              className="text-2xl font-semibold"
            >
              {item.title}
            </Link>
            <p>{item.short_desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
