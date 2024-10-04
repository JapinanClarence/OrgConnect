import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";

const Loginform = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const formData = LoginSchema.parse(data);

    console.log(formData);
  };
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-10 rounded-xl space-y-4 bg-white max-w-3xl w-[450px] shadow border border-slate-300"
    >
      <CardHeader>
        <img
          src="OrgConnect-transparent.svg"
          alt="OrgConnect logo"
          className="w-16 h-16 mx-auto"
        />
        <h1 className="font-bold text-2xl text-gray-900">Login</h1>
        <p className="text-sm text-gray-600">
          Fill in the form to get started.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs "/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs"/>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button
                id="submit"
                className="bg-gray-900 hover:bg-gray-800 text-md text-white rounded-md px-3 py-2 w-full"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default Loginform;
