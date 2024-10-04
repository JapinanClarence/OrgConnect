import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});
export const SignupSchema = z.object({
  firstname: z.string().min(1, {
    message: "Firstname is required",
  }),
  lastname: z.string().min(1, {
    message: "Lastname is required",
  }),
  middlename: z.string(),
  age: z.string().min(1, {
    message: "Age is required",
  }),
  contactNumber: z.string().min(1, {
    message: "Contact number is required",
  }),
  course: z.string().min(1, {
    message: "Course is required",
  }),
  studentId: z.string().min(1, {
    message: "Student Id is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});
