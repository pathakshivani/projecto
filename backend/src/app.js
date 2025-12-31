import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// configure middlewares
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}))
app.use(express.static("public"))

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(cookieParser())

// import routers
import { healthCheckRouter } from "./routes/index.js";

// configure routes
app.use("/api/v1/healthCheck", healthCheckRouter);

export default app;
