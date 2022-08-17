const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Grid = require("gridfs-stream");
const connectDB = require("./Config/connection");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  //   Morgan will allow us to make request logs in the terminal
  app.use(morgan("dev"));
}

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const foodItemRoutes = require("./Routes/foodItemRoutes");
const vendorRoutes = require("./Routes/vendorRoutes");
const reviewRoutes = require("./Routes/reviewsRoute");
const emailRoutes = require("./Routes/emailRoutes");
const profileRoutes = require("./Routes/profileRoutes");

connectDB();

// Creating Streaming Bucket
let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

app.use("/auth", authRoutes);
app.use("/email", emailRoutes);
app.use("/food", foodItemRoutes);
app.use("/vendor", vendorRoutes);
app.use("/review", reviewRoutes);
app.use("/cart", orderRoutes);
app.use("/user", profileRoutes);
// General Route for Getting Images
// Stored in MonogoDB
app.get("/images/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const file = await gfs.files.findOne({ filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).json({
      message: "Image Not Found in Database",
    });
  }
});
app.get('/', (req, res) => {
  res.send('Hello World')
} )
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
