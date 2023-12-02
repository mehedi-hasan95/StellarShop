import Card from "@/components/custom/Card";
import { getAllProductsData } from "@/lib/apiData/apiData";

const Products = async () => {
  const data = await getAllProductsData();
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card data={data} />
    </div>
  );
};

export default Products;
