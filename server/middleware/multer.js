const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = "uploads/avatars";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    const uniqueName = `${timestamp}-${sanitizedFilename}`;
    cb(null, uniqueName);
  }
});

// File type filter for images
const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedTypes = [".jpg", ".jpeg", ".png"];
  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only JPG, JPEG, and PNG images are allowed"));
  }
  cb(null, true);
};

// File size limit: 2MB (optional tweak)
const limits = {
  fileSize: 2 * 1024 * 1024 // 2MB
};

// Create Multer upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;
