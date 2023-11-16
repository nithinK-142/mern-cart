import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["https://mern-cart.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

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

app.get("/test", (_, res) => {
  res.send(PORT);
});

app.listen(PORT, () => console.log("SERVER STARTED"));

// await mongoose.connect(
//   `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/${process.env.MONGODB_CLUSTERNAME}`
// );
