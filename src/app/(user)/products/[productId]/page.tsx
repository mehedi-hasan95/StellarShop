import NotFound from "@/app/seller/not-found";
import { getSingleData } from "@/lib/apiData/apiData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface productidProps {
  params: {
    productId: string;
  };
}
const ProductId: React.FC<productidProps> = async ({ params }) => {
  const data = await getSingleData(params.productId);
  console.log(data);
  if (data.msg === "success") {
    return (
      <div className="container mx-auto p-4">
        <Tabs defaultValue={data?.product?.images[0]?.id}>
          {data?.product?.images?.map((item: any) => (
            <TabsContent key={item.id} value={item.id}>
              <Image
                src={item.url}
                alt=""
                height={500}
                width={500}
                className="lg:w-[720px] lg:h-[480px] object-cover"
              />
            </TabsContent>
          ))}
          <div className="mt-10">
            <TabsList>
              {data?.product?.images?.map((item: any) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "data-[state=active]:border-green-700 data-[state=active]:border-2 data-[state=active]:box-border"
                  )}
                >
                  <Image
                    src={item.url}
                    alt=""
                    height={500}
                    width={500}
                    className="h-10 w-10"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        <div className="pt-10">
          <h2 className="text-2xl font-semibold">{data?.product?.title}</h2>
          <p>{data?.product?.desc}</p>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default ProductId;
