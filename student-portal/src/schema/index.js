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
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

// Define the file schema
export const fileSchema = z
  .instanceof(File)
  .refine((file) => file?.size <= 5000000, {
    message: "File size must be less than 5MB",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "Only .jpg and .png formats are allowed",
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
