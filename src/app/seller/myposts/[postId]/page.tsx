import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getSingleData } from "@/lib/apiData/apiData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import NotFound from "../../not-found";

interface PostIdParams {
  params: {
    postId: string;
  };
}
const PostId: React.FC<PostIdParams> = async ({ params }) => {
  const { postId } = params;
  const data = await getSingleData(postId);
  if (data.msg === "success") {
    return (
      <div>
        <Tabs defaultValue={data?.product?.images[0]?.id}>
          {data?.product?.images?.map((item: any) => (
            <TabsContent key={item.id} value={item.id}>
              <Image
                src={item.url}
                alt=""
                height={500}
                width={500}
                className="lg:w-[720px] lg:h-[480px]"
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

export default PostId;
