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

const MyProfile = () => {
  const { data } = useSession();
  return (
    <div>
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
          <PopoverContent>
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
