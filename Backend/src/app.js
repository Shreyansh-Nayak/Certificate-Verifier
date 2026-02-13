import express from "express";
import cors from "cors";
import certificateRoutes from "./routes/certificate.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// 1️⃣ Global middlewares FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-vercel-domain.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2️⃣ Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

export default app;
