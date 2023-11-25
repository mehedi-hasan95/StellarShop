"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyPosts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {data?.products?.map((item: any) => (
        <div key={item.id}>
          <Image src={item.image} alt="" height={500} width={500} />
          <Link href={`/product/${item.id}`}>{item.title}</Link>
          <p>{item.short_desc}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
