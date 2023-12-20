import getCurrentUser from "@/actions/getCurrentUser";

const SellerDashboard = async () => {
  const session = await getCurrentUser();
  return (
    <div>
      <h2 className="text-2xl">
        Wellcome <span className="font-bold">{session?.name}</span>
      </h2>
    </div>
  );
};

export default SellerDashboard;
