import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const BillboardPage = async () => {
  const data = await prismadb.billboard.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
          All Billboard
        </h2>
        <Button asChild>
          <Link href="billboard/new">New</Link>
        </Button>
      </div>
      <div className="py-10">
        <Separator className={cn("bg-emerald-600")} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((item) => (
          <Link
            key={item.id}
            href={`/admin/billboard/${item.id}`}
            className="shadow-md px-2 py-5"
          >
            <Image
              src={item.image}
              alt={item.label}
              height={500}
              width={500}
              className=""
            />
            <h2 className="text-xl pt-7 pb-1">{item.label}</h2>
            <h4>Category: {item.category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BillboardPage;
