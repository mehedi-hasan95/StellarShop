import Card from "@/components/custom/Card";

async function getAllProductsData() {
  try {
    const res = await fetch(process.env.BASE_URL + `/user/allproducts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}
const Products = async () => {
  const data = await getAllProductsData();
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card data={data} />
    </div>
  );
};

export default Products;
