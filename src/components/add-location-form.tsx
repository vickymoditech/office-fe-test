"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Location } from "@/utils/types/locations";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  employee: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    position: z.string().min(2, "Position must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
  }),
});

type Props = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  location?: Location;
};

export const AddEditLocationForm = ({
  location,
  onSubmit,
  onCancel,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: location?.title || "",
      address: location?.address || "",
      employee: {
        name: location?.employee?.name || "",
        position: location?.employee?.position || "",
        email: location?.employee?.email || "",
        phone: location?.employee?.phone || "",
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(
      e.target.name as keyof z.infer<typeof formSchema>,
      e.target.value,
      { shouldValidate: true }
    );
    form.clearErrors(e.target.name as keyof z.infer<typeof formSchema>);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{location ? "Edit Location" : "Add New Location"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Headquarters"
                      {...field}
                      onChange={handleOnChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="3763 W. Dallas St."
                      {...field}
                      onChange={handleOnChange}
                      formNoValidate
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employee.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      onChange={handleOnChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employee.position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Software Engineer"
                      {...field}
                      onChange={handleOnChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employee.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                      onChange={handleOnChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employee.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(555) 555-0123"
                      {...field}
                      onChange={handleOnChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>

              <Button type="submit" disabled={!form.formState.isValid}>
                {location ? "Edit Location" : "Add Location"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
