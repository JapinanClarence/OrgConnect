import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import superAdminRoutes from "./routes/superadmin/user.js";
import adminRoutes from "./routes/admin/user.js";
import userRoutes from "./routes/user.js";
import adminOrganizationRoutes from "./routes/admin/organization.js";
import organizationRoutes from "./routes/organization.js";

const app = express();

const PORT = process.env.PORT;

//connect to local db
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.use(cors());

//auth router
app.use("/api/", auth);
//super admin routes
app.use("/api/superadmin/", superAdminRoutes)
//admin routes
app.use("/api/admin/", adminRoutes);
app.use("/api/admin/", adminOrganizationRoutes)
//user routes
app.use("/api/user/", userRoutes);
app.use("/api/user/", organizationRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
 
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
