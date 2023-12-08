import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getCategoryData } from "@/lib/apiData/apiData";

interface CategoryItemProps {
  id: string;
  name: string;
  image: string;
  slug: string;
}

const Category = async () => {
  const data = await getCategoryData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl lg:text-2xl font-bold">
          Your Category ({data?.category?.length})
        </h2>
        <Button asChild>
          <Link href={"/admin/category/new"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crate Category
          </Link>
        </Button>
      </div>
      <Separator className="mt-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.category?.map((item: CategoryItemProps) => (
          <div key={item.id}>
            <Link href={`/admin/category/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.name}
                height={500}
                width={500}
                className="h-24 w-24 rounded-full"
              />
              <h4 className="text-lg">{item.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
