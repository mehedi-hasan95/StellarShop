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

const SearchBar = () => {
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
        <div className="mt-5 max-w-3xl mx-auto flex justify-between items-center bg-white rounded-md">
          <Input
            type="search"
            placeholder="What are you looking for"
            className={cn("outline-none focus-visible:ring-0")}
          />
          <div className="bg-white rounded-md rounded-r-md">
            <Search className="mx-2 h-10 w-10 py-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
