import { uploadProductImage, uploadCategoryImage, getPublicUrlForKey } from "../utils/s3.js";
import { successResponse } from "../utils/apiResponse.js";

/**
 * Test upload endpoint - validates S3 upload functionality
 * Accepts an image file and uploads it to S3
 */
export const testUpload = async (req, res) => {
  if (!req.file) {
    const error = new Error("No file provided");
    error.statusCode = 400;
    throw error;
  }

  // Upload to S3 with "test" prefix
  const result = await uploadProductImage(req.file.buffer, req.file.originalname);

  successResponse(res, "File uploaded successfully to S3", {
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    s3Key: result.key,
    s3Bucket: result.bucket,
    publicUrl: result.url
  }, 201);
};

/**
 * List S3 file info - helper endpoint
 */
export const getUploadInfo = async (req, res) => {
  const { key } = req.body;
  
  if (!key) {
    const error = new Error("S3 key is required");
    error.statusCode = 400;
    throw error;
  }

  const publicUrl = getPublicUrlForKey(key);

  successResponse(res, "S3 file info retrieved", {
    key,
    publicUrl
  });
};
