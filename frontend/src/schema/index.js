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
// Regex pattern for time in HH:MM (24-hour format)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const EventSchema = z.object({
  title: z.string().min(1, {
    message: "Event title is required",
  }),
  description: z.string().optional(),
  startDate: z.string(), // Validate string from HTML input
  endDate: z.string(),
  checkIn: z.string().refine((value) => timeRegex.test(value), {
    message: "Invalid time format. Expected HH:MM",
  }),
  checkOut: z.string().refine((value) => timeRegex.test(value), {
    message: "Invalid time format. Expected HH:MM",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
});
