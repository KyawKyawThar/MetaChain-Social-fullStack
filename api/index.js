const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config({ path: "./config.env" });

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Social");
});

app.use("/assets", express.static(path.join(__dirname, "public/assets/")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then(() => console.log("Successfully connect MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
