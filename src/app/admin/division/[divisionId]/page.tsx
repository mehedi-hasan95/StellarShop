import prismadb from "@/lib/prismadb";
import DivisionForm from "@/app/admin/_components/DivisionForm";

const DivisionId = async ({ params }: { params: { divisionId: string } }) => {
  const division = await prismadb.division.findUnique({
    where: {
      slug: params.divisionId,
    },
  });
  return (
    <div>
      <DivisionForm initialData={division} />
    </div>
  );
};

export default DivisionId;
