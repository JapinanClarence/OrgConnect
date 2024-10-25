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
  middlename: z.string().optional(),
  course: z.string().min(1, {
    message: "Course is required",
  }),
  year: z.string().min(1, {
    message: "Year is required",
  }),
  studentId: z
    .string()
    .regex(/^\d{4}-\d{4}$/, {
      message: "Invalid ID number format",
    })
    .max(9),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

export const UserSchema = z.object({
  firstname: z.string().min(1, {
    message: "Firstname is required",
  }),
  lastname: z.string().min(1, {
    message: "Lastname is required",
  }),
  middlename: z.string().optional(),
  course: z.string().min(1, {
    message: "Course is required",
  }),
  year: z.string().min(1, {
    message: "Year is required",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  contactNumber: z.string().min(11, {
    message: "Invalid contact number",
  }),
  gender: z.string().optional(),
  birthday: z.string().optional(),
  username: z.string().min(1, {
    message: "Username is required",
  }),
});
