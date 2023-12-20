import prismadb from "@/lib/prismadb";
import ProductForm from "./_conponents/ProductForm";
import getCurrentUser from "@/actions/getCurrentUser";

const PostId = async ({ params }: { params: { postId: string } }) => {
  const session = await getCurrentUser();
  const product = await prismadb.products.findUnique({
    where: {
      slug: params.postId,
      sellerId: session?.id,
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
