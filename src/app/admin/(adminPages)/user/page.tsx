"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
interface DataProps {
  msg: string;
  user: User[];
}
const User = () => {
  const [data, setData] = useState<DataProps>();
  useEffect(() => {
    fetch("http://localhost:3000/api/user")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.user?.map((item: any, i: number) => (
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
