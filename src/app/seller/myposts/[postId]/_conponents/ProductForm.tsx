"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/custom/ImageUpload";
import { useParams, useRouter } from "next/navigation";
import { Category, District, Division, Image, Products } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  short_desc: z
    .string()
    .min(10, {
      message: "Short Description must be at least 10 characters.",
    })
    .max(260, {
      message: "Short Description must not be longer than 260 characters.",
    }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  isNew: z.boolean().default(false).optional(),
  divisionId: z.string().min(2, {
    message: "Selected division name",
  }),
  districtId: z.string().min(2, {
    message: "Selected district name",
  }),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1 characters.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1 characters.",
  }),
  catId: z.string().min(1, {
    message: "Category must be at least 2 characters.",
  }),
});

// the props
interface PostFormProps {
  initialData:
    | (Products & {
        images: Image[];
      })
    | null;
  categorie: Category[];
  division: Division[];
  district: District[];
}
const ProductForm: React.FC<PostFormProps> = ({
  initialData,
  categorie,
  division,
  district,
}) => {
  // Prevent Hydration error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // others
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // message
  const title = initialData ? "Edit billboard" : "Create billboard";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      desc: "",
      short_desc: "",
      isNew: true,
      divisionId: "",
      districtId: "",
      images: [],
      price: 1,
      quantity: 1,
      catId: "",
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
    const slug = slugify(values.title);
    try {
      setLoading(true);
      if (initialData) {
        const response = await fetch(`/api/products/${params.postId}`, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            desc: values.desc,
            short_desc: values.short_desc,
            isNew: values.isNew,
            divisionId: values.divisionId,
            districtId: values.districtId,
            images: values.images,
            price: values.price,
            quantity: values.quantity,
            catId: values.catId,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/seller/myposts");
        }
      } else {
        const response = await fetch("/api/products", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            desc: values.desc,
            short_desc: values.short_desc,
            isNew: values.isNew,
            divisionId: values.divisionId,
            districtId: values.districtId,
            images: values.images,
            price: values.price,
            quantity: values.quantity,
            catId: values.catId,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/seller/myposts");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // end Hydration error
  if (!isMounted) {
    return null;
  }

  // start the return function
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold pb-8">{title}</h2>
        {initialData && (
          <Button variant={"destructive"}>
            <Trash2 size={24} />
          </Button>
        )}
      </div>
      <div className="py-10">
        <Separator className={cn("bg-emerald-600")} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us your story"
                    className="resize-none"
                    {...field}
                    rows={10}
                  />
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
            name="districtId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Choose District"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {district?.map((item: any) => (
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
            name="catId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Choose Category"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categorie?.map((item: any) => (
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
            name="isNew"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Product Status:</FormLabel>
                  <FormDescription>Is your product new?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Add Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
