import { getAuthSession } from "../api/auth/[...nextauth]/route";

const SellerDashboard = async () => {
  const session = await getAuthSession();
  return (
    <div>
      <h2 className="text-2xl">
        Wellcome <span className="font-bold">{session?.user?.name}</span>
      </h2>
    </div>
  );
};

export default SellerDashboard;
