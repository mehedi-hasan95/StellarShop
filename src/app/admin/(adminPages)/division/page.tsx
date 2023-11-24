"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const Division = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3000/api/division", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.msg === "success") {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/division")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center bg-black px-3 py-2 dark:bg-white dark:text-black text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Division
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you want to create a division?</DialogTitle>
            <DialogDescription asChild>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jashore" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="sm:justify-end">
                    <Button type="submit">Submit</Button>
                    <DialogClose asChild>
                      <Button variant="secondary">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Separator className="mt-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {data?.division?.map((item: any) => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <p className="capitalize">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Division;
