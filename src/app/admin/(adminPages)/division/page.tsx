"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import useSWR from "swr";

const Division = () => {
  const { data } = useSWR("/api/division");
  return (
    <div>
      <Button asChild>
        <Link href="/admin/division/new">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Division
        </Link>
      </Button>
      <Separator className="mt-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.division?.map((item: any) => (
          <Link key={item.id} href={`/item/${item.slug}`}>
            <p className="capitalize">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Division;
