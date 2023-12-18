"use client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import useSWR from "swr";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface UserProps {
  id: string;
  image: string;
  name: string;
  email: string;
  createdAt: string;
}

const User = () => {
  const { data } = useSWR("/api/admin/user");
  return (
    <Table>
      <TableCaption>
        <Separator className={cn("bg-emerald-500")} />
        <p className="pt-5 text-md font-bold text-black">A list of User.</p>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Profile Picture</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Open Account</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.user?.map((item: UserProps) => (
          <TableRow key={item.id}>
            <TableCell>
              {
                <Image
                  src={item.image}
                  alt=""
                  height={500}
                  width={500}
                  className="h-10 w-10 rounded-full"
                />
              }
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              {format(new Date(item.createdAt), "dd-MMM-yyyy")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default User;
