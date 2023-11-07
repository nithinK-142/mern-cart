import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import { config } from "dotenv";

config();
const app = express();

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
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/ecommerce`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

connectDB();

app.get("/test", (_, res) => {
  res.send("Hey there");
});

app.listen(3001, () => console.log("SERVER STARTED"));