// NOTES
// nodemon for live updates to the server, instead of killing and starting again

// common js syntax
// const express = require("express");

// module syntax
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();

// if request starts with this, then use this file
app.use("/api/notes", notesRoutes);

// listening for this get request @ localhost:5001/api/notes

// listen to the port 5001
app.listen(5001, () => {
  console.log("Server started on PORT:", PORT);
});
