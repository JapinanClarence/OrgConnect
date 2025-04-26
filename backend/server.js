import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import superAdminRoutes from "./routes/superadmin/user.js";
import adminRoutes from "./routes/admin/user.js";
import userRoutes from "./routes/user.js";
import adminOrganizationRoutes from "./routes/admin/organization.js";
import organizationRoutes from "./routes/organization.js";
import adminEventRoutes from "./routes/admin/events.js";
import attendanceRoutes from "./routes/admin/attendance.js";
import adminAnnouncementRoutes from "./routes/admin/announcement.js";
import adminPaymentRoutes from "./routes/admin/payment.js";
import adminMembersRoutes from "./routes/admin/members.js";
import adminOfficerRoutes from "./routes/admin/officer.js";
import dashbordRoute from "./routes/admin/dashboard.js";
import adminAccRoute from "./routes/admin/accounts.js";
import eventRoutes from "./routes/events.js";
import announcementRoutes from "./routes/announcements.js";
import paymentRoutes from "./routes/payment.js";
import officerRoutes from "./routes/officers.js";
import userAttendanceRoutes from "./routes/attendance.js";
import superadminOrgs from "./routes/superadmin/organization.js";
import acadYear from "./routes/superadmin/academicyear.js";
import superAdminDashboard from "./routes/superadmin/dashboard.js";
import notifSbuscription from "./routes/subcription.js";
// import webpush from "web-push";
import  {initializeApp} from "firebase-admin/app";
import admin from "firebase-admin";

const serviceAccount = {
  "type": "service_account",
  "project_id": "orgconnectpushnotif",
  "private_key_id": "51b51e5d1fe270142a456a194df06c0aa168bb49",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9MHfQmGjxVuJl\necxbmFHEEK9qRGEIU+UCQStMcSu4JpwjGzVI6ud2CX7MiYfDBb3oDZrN+LeFKJNJ\nM87CUl+OzRi6wgjjxJX7ZNNTPbuUqgKnEPV/Sa7UR7uaVCMU+1r84bvUO6Slx4ZO\nLvyk6gEnOzIiRh9T3fxs2n6rOWf6DyUPKJSS0GLWFBDc8svi8g+/pkBZyytGDblX\nnOvt42x10OVwOPHohVX9gYaRNUjcxhKa1g7TF/egPb+ZfNYnx2B54/T4wEVG3Z13\nxdWLEOcBjCbiNaqSKo9Cp3sPs/E8UZPqulkzjR6Vh5Xh09Ezagks94fY8GklozpQ\nHahOHRUVAgMBAAECggEATn/i5ymmOaV8cPCVy9eq7biioGxY+rSczE+wIJrAsjtL\nBAIRHP1jJwYPl9zk+RXT04p5lkdCFr1cR754Zwb44W7WeP9z4tY6CUKvsNVnlOrq\nCNovky5GnYxaGlIY8GbPPSiI4CoTSjo8zwoOCHuUGOwmBDSmYQ015RDQCEnci9Ow\nHKMkWYsS1PVadIDMK17OECPCRb1EokkpxtkqG3rxggtduASPtBe5MDKhY0qLz/H5\n2D1hVJpx6p2gwlnTMbtX9E49eKrsz/cVXZP8MAOvmCeuq7lK6jPrJ31JJ12i6srg\nIt8+MkxHW7GuyjFH7INDFKjh7A4fEoaLlxodzjVCDQKBgQDlEuOak/r5ppHVmliq\n6LUeC4Tj1/Js0za5xPS+hASU1A1iZ2fCwntnKc1Jk6P2eV9DRSbe2uWcvOSBfpHY\nMiroPTmAIV81VWF1laAK5N6I3TXumAvTYsn+34tKeRgV3hrf9Igw6tkvAK851USr\niBFrp0LU4d04+23+7E4+DyBoGwKBgQDTbWghFguHjjHjDPK/ZdoU6ciQF58M33tB\nqQ3I/upYuCbfFS9KgAP9a3GSJH72k5XdLlJNODS0JLcxUiU97G/NZEAsHhqtYx/n\nLtA/QNqtowfDgLziWHsqRut+WlAbkZkoP4T7lJE9CD5u3BqKu4lsG6L1EA9O7KIi\nXGKbUbOqjwKBgQDMJ9GBanE7HiDK5gwwBcWlSU7eYQ9FvdgAKHCXesE6guKK2O24\nveuNPcwfzt1KRVGJeo/x/dS1pANjBZKlw9BJuocMkrFvrvB1AyzniKJsB/qQ8iFX\n+6ta45AYh2PX2WLKRf0625NEOK/yMwhId7RO5XrCj6nBpxOZJrF0zbZsEQKBgAlp\n56cBekXw2NvJKc3H1Sv1NM7lnllOYgiMZGa8ouaMXH62TMK+bG8OJ6JgKZ8E9zk/\n5L43cHFM6TMy+yGEs32rpwfP11Q9A6ChfvgyBQqSJbhYtRBG7ET3n2ii0MpJc05N\ndbhV5xmWkmERP8VJkFbV7C2JJ4VWF+n7vxA3VQ6VAoGBAKrdNM7DCaSOsT/0urBZ\nYHGW1TetoAKDuwGtxZtOIWaNQsOqQUkYktzE5OvC8+/s130VdFZ8OQ8LZUFp3gH/\nYbvtpezQuRMSfmg/2PIFvNJB7bJz/GgcA5rMa3Oci7RqDVq0zR+phiY8p+S5iNZP\nnTP41ZxKYOp93thJko2ut3Dk\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@orgconnectpushnotif.iam.gserviceaccount.com",
  "client_id": "105898210682575810635",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40orgconnectpushnotif.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "orgconnectpushnotif",
});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
const app = express();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "development") {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => {
      console.log("Local DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
} else if (NODE_ENV === "production") {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
}

app.use(cors());

// Set up web push configuration
// webpush.setVapidDetails(
//   "mailto:rosaliesumaligpon13@gmail.com",
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );

//auth router
app.use("/api/", auth);
//admin profile routes
app.use("/api/admin/", adminRoutes);

//admin routes
app.use("/api/superadmin/", superAdminRoutes);
app.use("/api/superadmin/", superadminOrgs);
app.use("/api/superadmin/", acadYear);
app.use("/api/superadmin/", superAdminDashboard);

app.use("/api/admin/", adminOrganizationRoutes);
app.use("/api/admin/", adminEventRoutes);
app.use("/api/admin/", adminAnnouncementRoutes);
app.use("/api/admin/", adminPaymentRoutes);
app.use("/api/admin/", adminMembersRoutes);
app.use("/api/admin/", adminOfficerRoutes);
app.use("/api/admin", dashbordRoute);
app.use("/api/admin/", adminAccRoute);
//attendance routes
app.use("/api/attendance", attendanceRoutes);
//user routes
app.use("/api/user/", userRoutes);
app.use("/api/user/", organizationRoutes);
app.use("/api/user/", eventRoutes);
app.use("/api/user/", announcementRoutes);
app.use("/api/user/", paymentRoutes);
app.use("/api/user/", officerRoutes);
app.use("/api/user/", userAttendanceRoutes);
//web push subscription route
app.use("/api/notification", notifSbuscription);
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
