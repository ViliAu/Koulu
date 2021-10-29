require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const passport = require("passport");
const PORT = process.env.PORT || 1234;

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(passport.initialize());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/api/user", require("./routes/user.js"));
app.use("/api/private", require("./routes/private.js"));
app.use("/api/todos", require("./routes/todos.js"));

app.get("/", (req, res) => { 
  res.render("index");
});

app.listen(PORT, () => {console.log("Server started on port " + PORT)});