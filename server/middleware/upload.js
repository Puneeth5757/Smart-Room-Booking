const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images Only!'));
  }
};

// Increase file size limit (e.g., 5MB)
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB file size limit
  fileFilter
});

module.exports = upload;
