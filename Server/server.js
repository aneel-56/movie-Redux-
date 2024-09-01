require("dotenv").config();

const mongoose = require("mongoose");

console.log(process.env.ATLAS_URI);

const cors = require("cors");
const cookieParser = require("cookie-parser");

const webpush = require("web-push");

// express app
const express = require("express");
const { userRouter } = require("./routes/userRoute");
const app = express();
const PORT = process.env.PORT;

const path = require("path");

const publicKey = `BOmWzA1l0l1OQT7N7GE8Yx29XTvg8Qbk2uQM3fXzGWiRLTfXOaP1sSfgZKMZismujJLhlB6G2WyaezRP61J3Y2g`;
const privateKey = `yhW2g33Vw4pA4VVxMFjLa6oLbitAvpPRkHC0KHoxiPs`;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/user", userRouter);
// webpush.setVapidDetails(
//   "www.culturalarcher2058@gmail.com",
//   publicKey,
//   privateKey
// );

//subscribe routes
// app.get("/subscribe", (req, res) => {
//   // get subscription object
//   const subscription = req.body;

//   // create the resource created
//   res.status(201).json({});

//   // create a payload
//   const payload = JSON.stringify({ title: "This is webpush" });

//   // send the notification
//   webpush
//     .sendNotification(subscription, payload)
//     .catch((err) => console.log(err));
// });

// connecting to database
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("App connected to PORT", PORT);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });
