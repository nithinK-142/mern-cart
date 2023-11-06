import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
// require('dotenv').config();
import { config } from "dotenv";

config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: ["https://mern-cart.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use("/user", userRouter);
app.use("/product", productRouter);

const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/ecommerce`
    )
    .catch(function (error) {
      console.log(`ERROR: ${error} `);
    });
};

connectDB();

app.listen(3001, () => console.log("SERVER STARTED"));

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/ecommerce`
// );

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/ecommerce`
// );

// const connectDB = async () => {
//   try {
//     await mongoose.connect(`mongodb+srv://user:password@cluster.td2to3g.mongodb.net/cluster", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error(`Unable to connect to the MongoDB: ${error}`);
//   }
// };

// const connectDB = async () => {
//   const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/ecommerce`;

//   mongoose.connection.on('connecting', () => {
//     console.log('Connecting to MongoDB...');
//   });

//   mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB');
//   });

//   mongoose.connection.on('error', (error) => {
//     console.error(`Unable to connect to the Mongo db: ${error}`);
//   });

//   try {
//     await mongoose.connect(dbURI);
//   } catch (error) {
//     console.error(`Error during database connection: ${error}`);
//   }
// };

// const connectDB = async () => {
//   await mongoose
//     .connect(
//       `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ecommerce.td2to3g.mongodb.net/ecommerce`
//     )
//     .catch(function (error) {
//       console.log(`error connecting...  ${error} `);
//     });
// };

// connectDB();

// app.listen(3001, () => console.log("SERVER STARTED"));
