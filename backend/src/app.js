import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import routes from "./routes/index.js";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
app.use(morgan("combined"));
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api", routes);

app.get("/health", (req, res) => res.status(200).json({ ok: true }));
app.use(notFound);
app.use(errorHandler);

export default app;
