const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

let avatarUploadInstance = null;
let documentUploadInstance = null;

function getAvatarUpload() {
  if (!isCloudinaryConfigured()) {
    return null;
  }
  if (!avatarUploadInstance) {
    const avatarStorage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'college-management/avatars',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
      },
    });
    avatarUploadInstance = multer({
      storage: avatarStorage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    });
  }
  return avatarUploadInstance;
}

function getDocumentUpload() {
  if (!isCloudinaryConfigured()) {
    return null;
  }
  if (!documentUploadInstance) {
    const documentStorage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'college-management/documents',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
        resource_type: 'auto',
      },
    });
    documentUploadInstance = multer({
      storage: documentStorage,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    });
  }
  return documentUploadInstance;
}

// Middleware wrappers that gracefully check configuration
const uploadAvatar = (req, res, next) => {
  const upload = getAvatarUpload();
  if (!upload) {
    return res.status(503).json({
      message: 'Cloudinary storage is not configured on the server. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.',
    });
  }
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds 5MB limit' });
      }
      return res.status(400).json({ message: err.message || 'Avatar upload failed' });
    }
    next();
  });
};

const uploadDocument = (req, res, next) => {
  const upload = getDocumentUpload();
  if (!upload) {
    return res.status(503).json({
      message: 'Cloudinary storage is not configured on the server. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.',
    });
  }
  upload.single('document')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds 10MB limit' });
      }
      return res.status(400).json({ message: err.message || 'Document upload failed' });
    }
    next();
  });
};

module.exports = { isCloudinaryConfigured, uploadAvatar, uploadDocument };

