import React, { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const PageHead = ({ title, allowSearch = false, onSubmit }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(SearchSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = ({content}) =>{

    if(!content) {
      setShowSearchInput(false)
    }else{
      onSubmit(content)
    }
  }


  return (
    <header className="fixed top-0 left-0 w-full h-12 z-10">
      <div className="px-3 py-2 bg-slate-50 shadow-sm border-b flex gap-2 items-center justify-between">
        {!showSearchInput && (
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={23} />
          </Button>
        )}

        {!showSearchInput && (
          <div className="flex-1 font-medium">
            <h1>{title}</h1>
          </div>
        )}

        {allowSearch && !showSearchInput && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearchInput(true)}
          >
            <Search size={23} />
          </Button>
        )}

        {showSearchInput && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Input {...field} type="text" autoFocus />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 w-min hover:bg-transparent"
                        >
                          <Search />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
    </header>
  );
};

export default PageHead;
