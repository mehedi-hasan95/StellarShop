import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import { getDistrictData } from "@/lib/apiData/apiData";

const District = async () => {
  const data = await getDistrictData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl lg:text-2xl font-bold">
          All District ({data?.district?.length})
        </h2>
        <Button asChild>
          <Link href={"/admin/district/new"}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New District
          </Link>
        </Button>
      </div>
      <Separator className="mt-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.district?.map((item: any) => (
          <Link key={item.id} href={`/admin/district/${item.slug}`}>
            <div>
              <Image
                src={item.image}
                alt={item.name}
                height={500}
                width={500}
                className="h-32 w-56"
              />
            </div>
            <p className="capitalize">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default District;
