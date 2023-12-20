"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ImageDown, Map, PlusCircle, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const AdminMenu = () => {
  const pathName = usePathname();
  return (
    <>
      <Button
        className={cn(`${pathName === "/admin" ? "bg-gray-300" : ""}`)}
        asChild
        variant={"outline"}
      >
        <Link href="/admin">
          <Home className="mr-2 h-4 w-4" />
          Back to Admin
        </Link>
      </Button>
      <Button
        className={cn(`${pathName === "/admin/category" ? "bg-gray-300" : ""}`)}
        asChild
        variant={"outline"}
      >
        <Link href="/admin/category">
          <PlusCircle className="mr-2 h-4 w-4" /> Category
        </Link>
      </Button>
      <Button
        className={cn(`${pathName === "/admin/division" ? "bg-gray-300" : ""}`)}
        asChild
        variant={"outline"}
      >
        <Link href="/admin/division">
          <Map className="mr-2 h-4 w-4" /> Division
        </Link>
      </Button>
      <Button
        className={cn(`${pathName === "/admin/district" ? "bg-gray-300" : ""}`)}
        asChild
        variant={"outline"}
      >
        <Link href="/admin/district">
          <Map className="mr-2 h-4 w-4" /> District
        </Link>
      </Button>
      <Button
        className={cn(
          `${pathName === "/admin/billboard" ? "bg-gray-300" : ""}`
        )}
        asChild
        variant={"outline"}
      >
        <Link href="/admin/billboard">
          <ImageDown className="mr-2 h-4 w-4" /> Billboard
        </Link>
      </Button>
      <Button
        className={cn(`${pathName === "/admin/seller" ? "bg-gray-300" : ""}`)}
        asChild
        variant={"outline"}
      >
        <Link href="/admin/seller">
          <Users className="mr-2 h-4 w-4" /> All Seler
        </Link>
      </Button>
      <Button
        className={cn(`${pathName === "/admin/user" ? "bg-gray-300" : ""}`)}
        asChild
        variant={"outline"}
      >
        <Link href="/admin/user">
          <Users className="mr-2 h-4 w-4" /> All User
        </Link>
      </Button>
    </>
  );
};

export default AdminMenu;
