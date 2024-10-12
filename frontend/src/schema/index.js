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
export const OrgSchema = z.object({
  name: z.string().min(1, {
    message: "Organization name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  about: z.string(),
  contact: z.string(),
});

export const EventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, {
    message: "Event title is required",
  }),
  description: z.string().optional(),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  active: z.boolean(false).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const AnnouncementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, {
    message: "Announcement title is required",
  }),
  description: z.string().optional(),
  category: z.enum(["0", "1", "2", "3", "4"]),
});


export const PaymentSchema = z.object({
  id: z.string().optional(),
  purpose: z.string().min(1, {
    message: "Purpose is required",
  }),
  details: z.string().min(1, {message: "Detail is required"}),
  amount: z.number().min(1, {message: "Ammount is required"})
});
