import mongoose from "mongoose";
import express from "express";
import auth from "./routes/auth.js";
import AdminRoutes from "./routes/admin/user.js";


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

//auth router
app.use("/api/", auth);

app.use("/api/admin", AdminRoutes)

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
