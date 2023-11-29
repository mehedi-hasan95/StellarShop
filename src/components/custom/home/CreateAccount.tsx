import { Button } from "@/components/ui/button";
import { DollarSign, PlusCircle } from "lucide-react";
import Link from "next/link";

const CreateAccount = () => {
  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-5 justify-center shadow-[rgba(0,_0,_0,_0.24)_1px_2px_8px] py-10">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-gray-300 py-10">
          <div className="flex gap-10 items-center px-5">
            <div className="bg-gray-200 p-5 rounded-full">
              <DollarSign size={80} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Are you a sealler?</h2>
              <p className="py-4">
                Want to sale with us? Create an account and start selling
              </p>
              <Button variant="destructive" asChild>
                <Link href="/signin">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="px-10 py-10">
          <h2 className="text-xl font-bold">Want a job?</h2>
          <p className="py-5">
            If you are looking for a job then we are here to assist you
          </p>
          <Button asChild>
            <Link href="#">
              <PlusCircle className="mr-2 h-4 w-4" />
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
