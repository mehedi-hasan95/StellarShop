import prismadb from "@/lib/prismadb";
import ProductForm from "./_conponents/ProductForm";

const PostId = async ({ params }: { params: { postId: string } }) => {
  const product = await prismadb.products.findUnique({
    where: {
      slug: params.postId,
    },
    include: {
      images: true,
    },
  });
  const categorie = await prismadb.category.findMany();
  const division = await prismadb.division.findMany();
  const district = await prismadb.district.findMany();
  return (
    <div>
      <ProductForm
        categorie={categorie}
        division={division}
        district={district}
        initialData={product}
      />
    </div>
  );
};

export default PostId;
