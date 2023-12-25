"use client";
import useSWR from "swr";
import { Heart, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
// import useSWR from "swr";

interface WishListButtonProps {
  data: {
    id: string;
  };
}

const WishListButton: React.FC<WishListButtonProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSession();
  const { data: isFevorite, mutate } = useSWR(`/api/user/wishlist/${data.id}`);
  const handleWishlist = async () => {
    if (!currentUser?.data?.user?.id) {
      toast.error("Please login first");
    }
    if (isFevorite?.wishList?.productId) {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/user/wishlist/${isFevorite.wishList.id}`,
          {
            method: "DELETE",
          }
        );
        mutate();
        const result = await response.json();
        if (result.msg === "success") {
          toast.success("Removed from the WishList");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/wishlist/${data.id}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: data.id }),
        });
        mutate();
        const result = await response.json();
        if (result.msg === "success") {
          toast.success("Added to WishList");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Button disabled={loading} onClick={handleWishlist}>
        <Heart
          size={20}
          className={cn(
            `${
              isFevorite?.wishList?.id &&
              isFevorite?.wishList?.userId === currentUser?.data?.user?.id
                ? "text-red-500 fill-red-500"
                : ""
            } mr-2 `
          )}
        />{" "}
        Add to Bookmark
        {loading && (
          <div className={`animate-spin`}>
            <RotateCw />
          </div>
        )}
      </Button>
    </div>
  );
};

export default WishListButton;
