// NOTES
// nodemon for live updates to the server, instead of killing and starting again

// common js syntax
// const express = require("express");

// module syntax
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import { connect } from "mongoose";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
// in between the client and the server (req)

// if request starts with this, then use this file
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// listening for this get request @ localhost:5001/api/notes

// listen to the port 5001
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on PORT:", PORT);
  });
});
