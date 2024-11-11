const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const uploadFolder = path.join(__dirname, "images");

// Ensure "images" folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

// Handle file upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    console.log("File uploaded:", req.file.path);
    res.send("Image uploaded successfully!");
  } else {
    console.error("Image upload failed.");
    res.status(400).send("Image upload failed.");
  }
});

// Start server on port 3001
app.listen(3001, () => console.log("Server running on http://localhost:3001"));
