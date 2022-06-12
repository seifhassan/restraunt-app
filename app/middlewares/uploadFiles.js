const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const myLocation = path.join(`uploads/${file.fieldname}`);
    fs.mkdir(myLocation, () => {});
    cb(null, myLocation);
  },
  filename: function (req, file, cb) {
    const myFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, myFileName);
  },
});
const uploadFile = multer({ storage });
module.exports = uploadFile;
