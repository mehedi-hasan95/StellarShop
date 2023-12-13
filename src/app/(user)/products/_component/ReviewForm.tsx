// ReviewForm.js
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface dataProps {
  data: string;
}

interface ReviewDataProps {
  id: string;
  user: {
    image: string;
    name: string;
  };
  comment: string;
  review: number;
}
const ReviewForm: React.FC<dataProps> = ({ data }) => {
  const { data: session } = useSession();
  const { data: reviewData, mutate } = useSWR(`/api/review/${data}`);
  const [review, setReview] = useState(0);
  const handleStarClick = (selectedRating: number) => {
    setReview(selectedRating === review ? 0 : selectedRating);
  };
  const handleReviews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user.id) {
      toast.error("Login to write a review");
    }
    const comment: HTMLTextAreaElement = (e.target as any).comment.value;
    const rating = { review, comment, productId: data };
    try {
      const response = await fetch(`/api/review/${data}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(rating),
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("Message created successfully");
      }
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-2/3">
      <form onSubmit={handleReviews}>
        <div>
          <h2 className="md:text-xl font-bold">Select Product Rating</h2>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer md:text-3xl lg:text-4xl ${
                  star <= review
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
              >
                <Star />
              </span>
            ))}
          </div>
        </div>
        {review > 0 && (
          <>
            <Textarea
              name="comment"
              minLength={2}
              maxLength={200}
              className={cn("my-3")}
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </form>
      <div className="pt-10">
        <h2 className="md:text-xl font-bold pb-5">
          {reviewData?.reviews?.length}{" "}
          {reviewData?.reviews?.length > 1 ? "Reviews" : "Review"}
        </h2>
        <div className="flex flex-col gap-y-5">
          {reviewData?.reviews.map((item: ReviewDataProps) => (
            <div key={item.id}>
              <div className="flex gap-1 items-center">
                <Image
                  src={item.user.image}
                  alt=""
                  height={500}
                  width={500}
                  className="h-10 w-10 rounded-full"
                />
                <p>{item.user.name}</p>
              </div>
              <div className="flex py-1">
                {[...Array(item.review)].map((_, index) => (
                  <Star key={index} className="fill-yellow-400" />
                ))}
                {[...Array(5 - item.review)].map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
