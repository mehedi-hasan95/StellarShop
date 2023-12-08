"use client";

import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/custom/ImageUpload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Category } from "@prisma/client";
import toast from "react-hot-toast";
import { Trash, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  image: z.string().min(2, {
    message: "Image must be at least 2 characters.",
  }),
});

interface CategorFormProps {
  initialData: Category | null;
}
const CategorForm: React.FC<CategorFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const title = initialData ? "Update Category" : "Create Category";
  const toastMessage = initialData
    ? "Update Category Successfully"
    : "Create Category Successfully";
  const action = initialData ? "Save Changes" : "Create";
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      image: initialData?.image || "",
    },
  });

  // Convert slug
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = slugify(values.name);
    try {
      setLoading(true);
      if (initialData) {
        const response = await fetch(`/api/category/${params.categoryId}`, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            image: values.image,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/admin/category");
        }
      } else {
        const response = await fetch("/api/category", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            image: values.image,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/admin/category");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      const response = await fetch(`/api/category/${params.categoryId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("Category delete successfully");
        router.push("/admin/category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="md:text-xl lg:text-2xl font-bold">{title}</h2>
        {initialData && (
          <Dialog>
            <DialogTrigger>
              <Button variant={"destructive"}>
                <Trash size={24} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you want to delete the Division?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button onClick={onDelete}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{action}</Button>
        </form>
      </Form>
    </div>
  );
};

export default CategorForm;
