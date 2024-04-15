import { config } from "dotenv";
config();

import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import dbConnect from "./database/config";

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

dbConnect();

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
