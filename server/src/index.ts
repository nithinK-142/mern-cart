import { config } from "dotenv";
config();

import express, { type Request, type Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", 'example.com'],
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: [],
//   },
// }));

app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.URL}`],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Mern Cart API");
});

app.use("/user", userRouter);
app.use("/product", productRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

connectDB();

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
