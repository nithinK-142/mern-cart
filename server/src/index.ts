import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [`${process.env.URL}`],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// routes
import router from "./routes";

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Mern Cart API");
});
app.use(router);

// db connection
import dbConnect from "./config/db.config";
const port = process.env.PORT || 3001;
dbConnect()
  .then(() => {
    app.listen(port, () =>
      console.log(`⚙️ Server is running at port : ${port}`)
    );
  })
  .catch((err) => {
    console.log("MongoDB connection failed ", err);
  });

export default app;
