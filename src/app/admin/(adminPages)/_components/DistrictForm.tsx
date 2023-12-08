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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/custom/ImageUpload";
import useSWR from "swr";
import { District, Division } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  divisionId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// from props
interface DistrictFormProps {
  initialData: District | null;
  division: Division[];
}
const DistrictForm: React.FC<DistrictFormProps> = ({
  initialData,
  division,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit District" : "Create District";
  const toastMessage = initialData ? "District updated." : "District created.";
  const action = initialData ? "Save changes" : "Create";
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      divisionId: initialData?.divisionId || "",
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
        const response = await fetch(`/api/district/${params.districtId}`, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            image: values.image,
            divisionId: values.divisionId,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/admin/district");
        }
      } else {
        const response = await fetch("/api/district", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            image: values.image,
            divisionId: values.divisionId,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/admin/district");
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
      const response = await fetch(`/api/district/${params.districtId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("District delete successfully");
        router.push("/admin/district");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{title}</h2>

        {initialData && (
          <Dialog>
            <DialogTrigger>
              <Button variant={"destructive"}>
                <Trash2 size={24} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you want to delete this Billboard?
                </DialogTitle>
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
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="Jashore" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="divisionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Choose Division"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {division?.map((item: any) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="capitalize"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default DistrictForm;
