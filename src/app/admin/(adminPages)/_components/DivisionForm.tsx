"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/custom/ImageUpload";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Division } from "@prisma/client";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface DivisionFormProps {
  initialData: Division | null;
}
const DivisionForm: React.FC<DivisionFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit Division" : "Create Division";
  const toastMessage = initialData
    ? "Edit Division successfully"
    : "Create Division successfully";
  const action = initialData ? "Save Changes" : "Create";
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      image: "",
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
        const response = await fetch(`/api/division/${params.divisionId}`, {
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
          router.push("/admin/division");
        }
      } else {
        const response = await fetch("/api/division", {
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
          router.push("/admin/division");
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
      const response = await fetch(`/api/division/${params.divisionId}`, {
        method: "Delete", // or 'PUT'
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success(toastMessage);
        router.push("/admin/division");
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
                <FormLabel>Division Name</FormLabel>
                <FormControl>
                  <Input placeholder="khulna" {...field} />
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

export default DivisionForm;
