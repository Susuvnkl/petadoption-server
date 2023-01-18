const multer = require("multer");
const path = require("path");
const pathToImages = path.resolve(__dirname, "../images");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToImages);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const makeUrl = (req, res, next) => {
  //   const imgUrl = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
  //   req.body.photos = imgUrl;
  //   req.body.photos = req.file.path;

  next();
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: cloudStorage });
module.exports = { upload, makeUrl };
