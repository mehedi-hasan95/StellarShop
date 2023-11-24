"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const MyProfile = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-5">
      <ModeToggle />
      {data?.user.id ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              {data?.user?.image !== null ? (
                <AvatarImage src={data?.user?.image as string} />
              ) : (
                <AvatarImage src="https://github.com/shadcn.png" />
              )}
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4">
            {data?.user?.role === "admin" && (
              <Button asChild variant={"outline"} className={cn("w-full")}>
                <Link href="/admin">
                  <User2 className="mr-2 h-4 w-4" /> Admin
                </Link>
              </Button>
            )}
            <Button
              variant={"outline"}
              className={cn("w-full")}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Link className="text-lg font-semibold" href="/signin">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default MyProfile;
