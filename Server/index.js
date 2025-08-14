import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  globalErrorHandler,
  catchNotFound,
} from "./src/middlewares/errorHandler.js";

//api routes
import userRoutes from "./src/routes/userRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js"

//initialize express app
const app = express();

//middelwares - functions that have access to the req and res obj and can perform any task specified. - execute a piece of code, make changes to the req or res obj, call the next handler function. it basically helps to add and re-use function across the approutes and endpoints. the flow -
//1 request recieved by server
//2 req is passed through each other middlerwaer specified
//3 route handler processes the request
//4 response is sent back through the middlerware
//5 response is finally sent to the client
app.use(
  cors({
    origin: ["http://localhost:4800"], //allow request from client address
    credentials: true, //allow cookies to be sent
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], //permitted http methods
    optionsSuccessStatus: 200, //default status
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //log http requests to terminal in dev mode
}
app.use(cookieParser()) // initialize cookie in our app
app.use(express.json({ limit: "25mb" })); //parses request gotten from client side and sends back the response no greater than 25mb.
app.use(express.urlencoded({ extended: true, limit: "25mb" })); // useful for getting the large form submission in encoded formats such as base64 url strings where we set the content type of the request body
app.disable("x-powered-by"); //diable the tech stack used when sending response to the client

//get request time
app.use((req, res, next) => {
  req.requstTime = new Date().toISOString();
  next();
});

//test api routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Server is running",
    environment: process.env.NODE_ENV,
    timeStamp: req.requstTime,
  });
});

//assemble our api routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/patients",patientRoutes);

//handler routes errors
app.use(catchNotFound);

//global error handler
app.use(globalErrorHandler);

//database connection
const connectDb = async () => {
  const connectionOptions = {
    //env file in node when reading must beging with process.env
    dbName: process.env.MONGODB_DB_NAME, // read env file
    serverSelectionTimeoutMs: 45000, // max time to wait for a server to be selected (45secs in ours), if no server selection a timeout error is thrown
    socketTimeoutMs: 5000, // time before socket timeout due to inactivity, useful to avoid hanging connections
    retryWrites: true, // enables automatic retry of some writes operationslike insert or update a document
    retryReads: true, // enables automatic retry of read operations
    maxPoolSize: 50, //maximum number of connections in h mongidb conn pool. helps mange concurrent requests
    minPoolSize: 1, //minimum number of connections maintained by mongodb pool
  };
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      connectionOptions
    );
    console.log(`✅Mongodb Connected: ${conn.connection.host}`);
    //connection event handlers
    mongoose.connection.on("error", (err) =>
      console.error("❌ Mongodb connection error", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("ℹ️ Mongodb disconnected")
    );
    //handle gracefull shutdown
    const gracefullShutdown = async () => {
      await mongoose.connection.close();
      console.log("ℹ️ Mongodb connection closed through app termination");
      process.exit(0);
    };
    process.on("SIGINT", gracefullShutdown); //ctrl + c
    process.on("SIGTERN", gracefullShutdown); // a signal to terminate a process
    return conn;
  } catch (error) {
    console.error("❌ Mongodb connection failed", error.message);
    process.exit(1); // exit the process, 1 usually indicates erro/failure
  }
};

// server configuration
const PORT = process.env.PORT || 5400;

//handle uncaught execeptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! ⛔ Shotting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    //INVOKE OUR DB CONNECTION
    await connectDb();
    const server = app.listen(PORT, () => {
      console.log(
        `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
    console.log(`🌍 http://localhost:${PORT}`);
    //handle unhandled promise rejection
    process.on("unhandledRejection", (err) => {
      console.error("❌ UNHANDLED REJECTION! Shutting down...");
      console.error(err.name, err.message);

      //close server gracefully
      server.close(() => {
        console.log("🧨 Process terminated due to unhandled rejection");
        process.exit(1);
      });
    });
    //handle graceful shutdown
    const shutdown = async () => {
      console.log("⛔ Received shutdown signal. Closing server...");
      server.close(() => {
        console.log("✅ server closed");
        process.exit(0);
      }); // force close if server doesn't close in time
      setTimeout(() => {
        console.error("⚠️ Forcing server shutdown");
        process.exit(0);
      }, 10000);
    };

    //handle termination signals
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error(`❌ Faioled to start server: ${error.message}`);
    process.exit(1);
  }
};

// start server
startServer();
