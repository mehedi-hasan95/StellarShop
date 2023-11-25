"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const Division = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/division")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div>
      <Button asChild>
        <Link href="/admin/division/new">Create New Division</Link>
      </Button>
      <Separator className="mt-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.division?.map((item: any) => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <p className="capitalize">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Division;
