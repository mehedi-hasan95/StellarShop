import NotFound from "@/app/seller/not-found";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const revalidate = 0;
import { Contact, DollarSign } from "lucide-react";
import ImageGallery from "@/components/custom/ImageGallery";
import AddToCart from "@/components/custom/AddToCart";
import WishListButton from "@/components/custom/WishListButton";
import ReviewForm from "@/app/(user)/products/_component/ReviewForm";

interface productidProps {
  params: {
    productId: string;
  };
}

async function getSingleData(productId: string) {
  const res = await fetch(
    process.env.BASE_URL + `/user/allproducts/${productId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const ProductId: React.FC<productidProps> = async ({ params }) => {
  const data = await getSingleData(params.productId);
  if (data?.msg !== "success") {
    return <NotFound />;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-5">
        <div className=" md:w-3/5">
          <ImageGallery data={data.product} />
          <div className="pt-10">
            <h2 className="text-2xl font-semibold pb-3">
              {data?.product?.title}
            </h2>
            {/* <p>{data?.product?.desc}</p> */}
            <div dangerouslySetInnerHTML={{ __html: data?.product?.desc }} />
            {/* <div>
              <Preview value={data?.product?.desc} />
            </div> */}
          </div>
        </div>
        <div className="md:w-2/5">
          <div className="border-2 rounded-lg p-5 mb-5">
            <h2>
              Seller Name:{" "}
              <span className="font-bold">{data?.product?.user?.name}</span>
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="flex gap-2 items-center">
                    <Contact /> Contact with seller
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <strong>Email:</strong> {data?.product?.user?.email}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 border-2 rounded-lg border-gray-200 p-5 mb-5">
            <h3 className="text-lg font-semibold flex gap-2">
              Price:{" "}
              <span className="flex items-center">
                <DollarSign size={14} /> {data?.product?.price}
              </span>
            </h3>
            <h4 className="">
              Condition:{" "}
              <span>{data?.product?.isNew === true ? "New" : "Used"}</span>
            </h4>
            <h4>
              Type:{" "}
              <span className="capitalize">{data.product.category.name}</span>
            </h4>
            <h4>
              Division:{" "}
              <span className="capitalize">{data.product.division.name}</span>
            </h4>
            <h4>
              District:{" "}
              <span className="capitalize">{data.product.district.name}</span>
            </h4>
          </div>
          <div className="flex gap-5 flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center border-2 border-gray-200 rounded-lg p-5">
            <WishListButton data={data?.product} />
            <AddToCart data={data?.product} />
          </div>
        </div>
      </div>

      <div className="py-10">
        <ReviewForm data={data.product.id} />
      </div>
    </div>
  );
};

export default ProductId;
