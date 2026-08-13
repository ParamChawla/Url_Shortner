import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRoutes from "./src/routes/short_url.route.js";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const clientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin(origin, callback) {
    // Health checks and API tools may not send an Origin header.
    if (!origin || clientOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("This origin is not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
}));

app.use(attachUser);
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrlRoutes);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});

export default app;
