import Image from "next/image";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
interface ImageGalleryProps {
  data: {
    images: Array<{
      id: string;
      url: string;
    }>;
  };
}
const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  return (
    <Tabs defaultValue={props?.data?.images[0]?.id}>
      {props?.data?.images?.map((item: any) => (
        <TabsContent key={item.id} value={item.id}>
          <Image
            src={item.url}
            alt=""
            height={500}
            width={500}
            className="object-cover"
          />
        </TabsContent>
      ))}
      <div className="mt-10">
        <TabsList>
          {props.data?.images?.map((item: any) => (
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
  );
};

export default ImageGallery;
