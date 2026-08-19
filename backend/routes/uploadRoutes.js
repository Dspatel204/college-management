const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadAvatar, uploadDocument } = require('../middleware/uploadMiddleware');

// POST /api/upload/avatar
// All authenticated users can upload their avatar
router.post(
  '/avatar',
  authMiddleware,
  uploadAvatar.single('avatar'),
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
router.post(
  '/document',
  authMiddleware,
  uploadDocument.single('document'),
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
