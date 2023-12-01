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
app.use(cors({}));

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
  res.send("Hey there");
});

app.listen(PORT, () => console.log("SERVER STARTED"));
