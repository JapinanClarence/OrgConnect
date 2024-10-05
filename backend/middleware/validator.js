import { body, validationResult } from "express-validator";

export const studentValidationRules = () => [
    body("studentId").notEmpty().withMessage("Student id is required"),
    body("firstname").notEmpty().withMessage("Firstname is required"),
    body("lastname").notEmpty().withMessage("Lastname is required"),
    body("age").notEmpty().withMessage("Age is required"),
    body("contactNumber").notEmpty().withMessage("Contact number is required"),
    body("course").notEmpty().withMessage("Course is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

export const userValidationRules = () => [
  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
]

export const organizationValidationRules = () => [
  body("name").notEmpty().withMessage("Organization name is required"),
]

export const eventValidationRules = () =>[
  body("title").notEmpty().withMessage("Event title is required"),
  body("startDate").notEmpty().withMessage("Start date is required"),
  body("endDate").notEmpty().withMessage("End date is required"),
  body("checkIn").notEmpty().withMessage("Check in is required"),
  body("checkOut").notEmpty().withMessage("Check out is required"),
  body("location").notEmpty().withMessage("Location is required"),
]

export const joinOrganizationValidationRules = () => [
  body("organization").notEmpty().withMessage("Organization is required"),
]

// Middleware to handle validation errors
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array().map((error) => error.msg),
      });
    }
    next();
  };
  