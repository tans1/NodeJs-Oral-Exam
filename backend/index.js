const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const questionsRouter = require("./routers/questionsRoute");
const userRouter = require("./routers/userRoute");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/db");
require("dotenv").config();
require("./middlewares/jwt");
app.use(cookieParser("cookie secret"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//* routes
app.use("/questions", questionsRouter);
app.use("/user", userRouter);

// Global middleware
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  });
});

app.listen(5000, () => console.log("Server is running . . ."));
