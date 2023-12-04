import BillboardForm from "./_component/BillboardForm";
import prismadb from "@/lib/prismadb";

const BillboardId = async ({ params }: { params: { id: string } }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <BillboardForm initialData={billboard} />
    </div>
  );
};

export default BillboardId;
