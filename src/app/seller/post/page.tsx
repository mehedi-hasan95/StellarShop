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
import { Division, District, Category } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  short_desc: z
    .string()
    .min(10, {
      message: "Short Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Short Description must not be longer than 30 characters.",
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
  image: z.string().min(0, {
    message: "Image is required",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 characters.",
  }),
  quantity: z.string().min(1, {
    message: "Quantity must be at least 2 characters.",
  }),
  catId: z.string().min(1, {
    message: "Category must be at least 2 characters.",
  }),
});

const SellerPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      isNew: true,
      divisionId: "",
      districtId: "",
      image: "",
      price: "1",
      quantity: "1",
      catId: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.post === "success") {
        router.push("/admin/myposts");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  //   division
  interface DivisionProps {
    msg: string;
    division: Division[];
  }
  const [data, setData] = useState<DivisionProps>();
  useEffect(() => {
    fetch("http://localhost:3000/api/division")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  //   District
  interface DistrictProps {
    msg: string;
    district: District[];
  }
  const [dData, setDData] = useState<DistrictProps>();
  useEffect(() => {
    fetch("http://localhost:3000/api/district")
      .then((response) => response.json())
      .then((data) => setDData(data));
  }, []);

  // Category
  interface CatProps {
    msg: string;
    category: Category[];
  }
  const [cat, setCat] = useState<CatProps>();
  useEffect(() => {
    fetch("http://localhost:3000/api/category")
      .then((response) => response.json())
      .then((data) => setCat(data));
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold pb-8">Create New Product:</h2>
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
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.division?.map((item: any) => (
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
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose District" />
                    </SelectTrigger>
                    <SelectContent>
                      {dData?.district?.map((item: any) => (
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
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {cat?.category?.map((item: any) => (
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
                  <Input placeholder="Price" {...field} />
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
                  <Input placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Add Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
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

export default SellerPage;
