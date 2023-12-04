import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBillboardData } from "@/lib/apiData/apiData";
import { cn } from "@/lib/utils";
import { Billboard } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type BillboardData = {
  billboard: Billboard[];
};
const BillboardPage = async () => {
  const data: BillboardData = await getBillboardData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
          This is the Billboard page
        </h2>
        <Button asChild>
          <Link href="billboard/new">New</Link>
        </Button>
      </div>
      <div className="py-10">
        <Separator className={cn("bg-emerald-600")} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.billboard.map((item) => (
          <Link key={item.id} href={`/admin/billboard/${item.id}`}>
            <Image
              src={item.image}
              alt={item.label}
              height={500}
              width={500}
              className="h-64 w-52"
            />
            <h2 className="text-xl">{item.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BillboardPage;
