import { getUserData } from "@/lib/apiData/apiData";
import Image from "next/image";

const User = async () => {
  const data = await getUserData();
  return (
    <div>
      {data.data.map((item: any, i: number) => (
        <div key={item.id}>
          <p className="flex gap-2 items-center">
            {i + 1}.{" "}
            <Image
              src={
                item.image !== undefined && item.image !== null
                  ? item.image
                  : "/logo.svg"
              }
              alt=""
              width={500}
              height={500}
              className="h-7 w-7 rounded-full"
            />{" "}
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default User;
