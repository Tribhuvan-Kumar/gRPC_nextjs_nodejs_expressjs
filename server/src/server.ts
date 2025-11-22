import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple logger middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// routes
app.use("/health", healthRouter);

// 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// error handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
