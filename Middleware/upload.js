const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    let { name } = req.body;
    name = name.split(" ").join("-").toLowerCase();

    if (match.indexOf(file.mimetype) === -1) {
      req.res.status(500).json({
        success: false,
        message: "JPEG, PNG file types supported only.",
      });
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-image-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage: storage });
