require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const subscribersRouter = require("./app/Routes/subscribers");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(express.static("dist"));
app.use("/subscribers", subscribersRouter);
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
