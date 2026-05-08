import { Router } from "express";
import { testUpload, getUploadInfo } from "../../../controllers/upload.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { uploadImage } from "../../../middleware/uploadMiddleware.js";

const router = Router();

/**
 * POST /test-upload
 * Test S3 upload functionality
 * Accepts: multipart/form-data with "image" field
 * Returns: S3 file info and public URL
 */
router.post(
  "/test-upload",
  uploadImage,
  asyncHandler(testUpload)
);

/**
 * POST /get-upload-info
 * Get public URL for S3 key
 * Body: { key: "s3-object-key" }
 */
router.post(
  "/get-upload-info",
  asyncHandler(getUploadInfo)
);

export default router;
