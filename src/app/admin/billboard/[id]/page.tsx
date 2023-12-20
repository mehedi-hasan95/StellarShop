// import BillboardForm from "./_component/BillboardForm";
import BillboardForm from "@/app/admin/billboard/[id]/_component/BillboardForm";
import prismadb from "@/lib/prismadb";

const BillboardId = async ({ params }: { params: { id: string } }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.id,
    },
  });
  const categories = await prismadb.category.findMany();
  return (
    <div>
      <BillboardForm categories={categories} initialData={billboard} />
    </div>
  );
};

export default BillboardId;
