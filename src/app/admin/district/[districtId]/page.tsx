import prismadb from "@/lib/prismadb";
import DistrictForm from "@/app/admin/_components/DistrictForm";

const DistrictId = async ({ params }: { params: { districtId: string } }) => {
  const district = await prismadb.district.findUnique({
    where: {
      slug: params.districtId,
    },
  });
  const division = await prismadb.division.findMany();
  return (
    <div>
      <DistrictForm division={division} initialData={district} />
    </div>
  );
};

export default DistrictId;
