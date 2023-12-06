"use client";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import useSWR from "swr";

const Category = () => {
  const { data } = useSWR("/api/category");
  return (
    <div>
      <Button asChild>
        <Link href={"/admin/category/new"}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crate Category
        </Link>
      </Button>
      <Separator className="mt-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.category?.map((item: any) => (
          <Link href={`/category/${item.slug}`} key={item.id}>
            <div>
              <Image
                src={item.image}
                alt={item.name}
                height={500}
                width={500}
                className="h-32 w-56"
              />
            </div>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
