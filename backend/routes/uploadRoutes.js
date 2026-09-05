const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadAvatar, uploadDocument } = require('../middleware/uploadMiddleware');

// POST /api/upload/avatar
// All authenticated users can upload their avatar
// uploadAvatar is a full middleware that internally calls multer.single('avatar')
router.post(
  '/avatar',
  authMiddleware,
  uploadAvatar,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
      url: req.file.path,        // Cloudinary secure URL
      publicId: req.file.filename,
      message: 'Avatar uploaded successfully',
    });
  }
);

// POST /api/upload/document
// Admin and teachers can upload documents
// uploadDocument is a full middleware that internally calls multer.single('document')
router.post(
  '/document',
  authMiddleware,
  uploadDocument,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
      message: 'Document uploaded successfully',
    });
  }
);

module.exports = router;
