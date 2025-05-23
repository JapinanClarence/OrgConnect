import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignupSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import apiClient from "@/api/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogCancel
} from "@/components/ui/dialog";
const SignupForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      gender:"",
      studentId: "",
      year: "",
      course: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });
  const tooglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  const toogleConfirmPasswordVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  const onSubmit = async (data) => {
    try {
      // setIsSubmitting(true);
      const formData = SignupSchema.parse(data);
    
      const response = await apiClient.post("/register", formData);
      if (response) {
        setIsSubmitting(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  // Handle accepting terms
  const handleAcceptTerms = () => {
    setTermsAccepted(true); // Set termsAccepted to true
    setShowTermsAndConditions(false); // Close the dialog
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {errorMessage && (
          <Alert
            variant="destructive"
            className="py-2 px-3 bg-red-500 bg-opacity-20"
          >
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div>
          <div className="grid grid-flow-col grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Firstname
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Lastname
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  Middlename{" "}
                  <span className="text-xs text-muted-foreground">{`(Optional)`}</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />
           <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  Student Id
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={"0000-0000"} />
                </FormControl>
                <FormMessage className="text-xs " />
              </FormItem>
            )}
          />
          <div className="grid grid-flow-col grid-cols-2  gap-2">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Course
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Courses</SelectLabel>
                        {/* facet */}
                        <SelectItem value="BSIT">
                          Bachelor of Science in Information Technology
                        </SelectItem>
                        <SelectItem value="BSCE">
                          Bachelor of Science in Civil Engineering
                        </SelectItem>
                        <SelectItem value="BSMATH">
                          Bachelor of Science in Mathematics
                        </SelectItem>
                        <SelectItem value="BITM">
                          Bachelor of Science in Industrial Management
                        </SelectItem>
                        <SelectItem value="BSN">
                          Bachelor of Science in Nursing
                        </SelectItem>
                        {/*  fted */}
                        <SelectItem value="BEED">
                          Bachelor of Elementary Education
                        </SelectItem>
                        <SelectItem value="BSED-Math">
                          Bachelor of Secondary Education major in Mathematics
                        </SelectItem>
                        <SelectItem value="BSED-English">
                          Bachelor of Secondary Education major in English
                        </SelectItem>
                        <SelectItem value="BSED-Science">
                          Bachelor of Secondary Education major in Science
                        </SelectItem>
                        <SelectItem value="BSED-Filipino">
                          Bachelor of Secondary Education major in Filipino
                        </SelectItem>
                        <SelectItem value="BSNED">
                          Bachelor of Special Needs Education
                        </SelectItem>
                        <SelectItem value="BTLED">
                          Bachelor of Science in Technical and Livelihood
                          Education
                        </SelectItem>
                        <SelectItem value="BPED">
                          Bachelor of Science in Physical Education
                        </SelectItem>
                        <SelectItem value="BECED">
                          Bachelor of Early Childhood Education
                        </SelectItem>
                        {/* fcje */}
                        <SelectItem value="BSCRIM">
                          Bachelor of Science in Criminology
                        </SelectItem>
                        {/* fbm */}
                        <SelectItem value="BSBA">
                          Bachelor of Science in Business Administration
                        </SelectItem>
                        <SelectItem value="BSHM">
                          Bachelor of Science in Hospitality Management
                        </SelectItem>
                        {/* fals */}
                        <SelectItem value="BSBIO">
                          Bachelor of Science in Biology
                        </SelectItem>
                        <SelectItem value="BSAM">
                          Bachelor of Science in Agribusiness Management
                        </SelectItem>
                        <SelectItem value="BSES">
                          Bachelor of Science in Environmental Science
                        </SelectItem>
                        <SelectItem value="BSA">
                          Bachelor of Science in Agcriculture
                        </SelectItem>
                        {/* fhssc */}
                        <SelectItem value="BSPolSci">
                          Bachelor of Science in Political Science
                        </SelectItem>
                        <SelectItem value="BSPsych">
                          Bachelor of Science in Psychology
                        </SelectItem>
                        <SelectItem value="BSDEVCOM">
                          Bachelor of Science in Development Communication
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="text" autoComplete="email" />
                </FormControl>
                <FormMessage className="text-xs " />
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
                  <div className="relative w-full ">
                    <Input
                      {...field}
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                      onClick={tooglePasswordVisibility}
                      aria-label={showPass ? "Hide Password" : "Show Password"}
                    >
                      {showPass ? (
                        <Eye className="text-gray-500 size-4" />
                      ) : (
                        <EyeOff className="text-gray-500 size-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative w-full ">
                    <Input
                      {...field}
                      type={showConfirmPass ? "text" : "password"}
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                      onClick={toogleConfirmPasswordVisibility}
                      aria-label={
                        showConfirmPass ? "Hide Password" : "Show Password"
                      }
                    >
                      {showConfirmPass ? (
                        <Eye className="text-gray-500 size-4" />
                      ) : (
                        <EyeOff className="text-gray-500 size-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mt-5">
                   <FormControl>
                  <Checkbox
                    checked={termsAccepted || field.value}
                    onCheckedChange={() => {
                      setTermsAccepted(!termsAccepted);
                      field.onChange(!termsAccepted);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  I agree to the{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => setShowTermsAndConditions(true)}
                  >
                    Terms and Conditions
                  </span>
                </FormDescription>
                </div>
               
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5 mt-10">
          <Button
            id="submit"
            size="default"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-md w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
          <div className="relative flex items-center">
            <div className="flex-grow border-b"></div>
            <span className="text-center px-4 text-muted-foreground">or</span>
            <div className="flex-grow border-b"></div>
          </div>
          <Button
            id="button"
            variant="outline"
            size="default"
            className="rounded-md w-full "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </form>
      <Dialog
        open={showTermsAndConditions}
        onOpenChange={setShowTermsAndConditions}
      >
        <DialogContent className="max-w-[320px] md:max-w-fit rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-start">
              Terms and Conditions
            </DialogTitle>
            <DialogDescription className="text-pretty text-start">
              Data Privacy Act of 2012 SEC.3 (b) Consent of the data subject
              refers to any freely given, specific, informed indication of will,
              whereby the data subject agrees to the collection and processing
              of personal information about and/or relating to him or her.
              Consent shall be evidenced by written, electronic or recorded
              means. It may also be given on behalf of the data subject by an
              agent specifically authorized by the data subject to do so.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className={"flex-col gap-2"}>
            
            {/* <Button
              type="button"
              variant="outline"
              className="border border-gray-500 hover:bg-gray-100"
              onClick={() => setShowTermsAndConditions(false)}
            >
              Cancel
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default SignupForm;
