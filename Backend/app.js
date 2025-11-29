require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./Routes/Auth");
const userRoutes = require("./Routes/User");
const jobRoutes = require("./Routes/Job");
const profileRoutes = require("./Routes/Profile");
const contactRoutes = require("./Routes/Contact");
const resumeRoutes = require("./Routes/Resume");

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const port = process.env.PORT;
const mongoURL = process.env.URL;

mongoose
  .connect(mongoURL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", jobRoutes);
app.use("/", profileRoutes);
app.use("/", contactRoutes);
app.use("/", resumeRoutes);

app.listen(port, () => console.log(`Server running at port ${port}`));
