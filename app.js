require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

//mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

// init express app
const app = express();

//static file
app.use(express.static("public"));

// express body parser
app.use(express.urlencoded({ extended: true }));

// set the ejs view engine
app.set("view engine", "ejs");

app.use("/", require("./routes/blogs"));

//server listening
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Server started on port: ${port}`));
