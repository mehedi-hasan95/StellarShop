import prismadb from "@/lib/prismadb";
import CategorForm from "@/app/admin/_components/CategoryForm";

const CategoryId = async ({ params }: { params: { categoryId: string } }) => {
  const category = await prismadb.category.findUnique({
    where: {
      slug: params.categoryId,
    },
  });
  return (
    <div>
      <CategorForm initialData={category} />
    </div>
  );
};

export default CategoryId;
