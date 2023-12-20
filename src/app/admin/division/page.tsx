import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";

async function getDivisoinData() {
  try {
    const res = await fetch(process.env.BASE_URL + `/admin/division`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}
const Division = async () => {
  const data = await getDivisoinData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl lg:text-2xl font-bold">
          Division ({data?.division?.length})
        </h2>
        <Button asChild>
          <Link href="/admin/division/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Division
          </Link>
        </Button>
      </div>
      <Separator className="mt-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.division?.map((item: any) => (
          <Link key={item.id} href={`/admin/division/${item.slug}`}>
            <p className="capitalize">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Division;
