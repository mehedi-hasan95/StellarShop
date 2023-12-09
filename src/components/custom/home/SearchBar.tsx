"use client";
import { MapPinIcon, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useSWR from "swr";
import { debounce } from "lodash";
import Link from "next/link";

const SearchBar = () => {
  const [result, setResult] = useState("");
  const { data, error, isLoading } = useSWR(
    result && `/api/search?title=${result}`
  );

  const handleDebounce = debounce((value) => {
    setResult(value);
  }, 400);

  interface PostProps {
    id: string;
    slug: string;
    title: string;
  }
  return (
    <div className="bg-emerald-500 dark:bg-black py-10">
      <div className="container mx-auto p-4">
        <Dialog>
          <DialogTrigger
            className={cn(
              "flex items-center mx-auto bg-emerald-700 text-white px-3 py-1 rounded-full"
            )}
          >
            <MapPinIcon className="mr-2 h-4 w-4" /> Whole Bangladesh
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select your city</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="mt-5 max-w-3xl mx-auto flex justify-between items-center bg-white rounded-md relative">
          <Search className="h-4 w-4 top-3 left-3 absolute" />
          <Input
            onChange={(e) => handleDebounce(e.target.value)}
            type="search"
            placeholder="What are you looking for"
            className={cn("outline-none focus-visible:ring-0 pl-9")}
          />
        </div>
        <div className="max-w-3xl mx-auto">
          {data?.posts?.length > 0 && (
            <div className="pt-5 bg-white px-3 pb-5">
              {data?.posts?.map((item: PostProps) => (
                <ul key={item.id}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-lg font-bold pb-3"
                  >
                    {item.title}
                  </Link>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
