import crypto from "crypto";
import path from "path";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env.js";

/**
 * Verify required environment variable is set
 */
function required(name, value) {
  if (!value) {
    const error = new Error(`Missing required environment variable: ${name}`);
    error.statusCode = 500;
    throw error;
  }
  return value;
}

/**
 * Initialize S3 client with AWS credentials
 */
const s3 = new S3Client({
  region: required("AWS_REGION", env.awsRegion),
  credentials: {
    accessKeyId: required("AWS_ACCESS_KEY_ID", env.awsAccessKeyId),
    secretAccessKey: required("AWS_SECRET_ACCESS_KEY", env.awsSecretAccessKey)
  }
});

/**
 * Sanitize filename to remove special characters
 */
function sanitizeFilename(originalName = "file") {
  const base = path.basename(originalName).replace(/[^\w.\-]+/g, "-");
  return base.length ? base : "file";
}

/**
 * Build S3 key with random ID and optional prefix
 */
function buildKey({ prefix, filename }) {
  const cleanPrefix = String(prefix || "").replace(/^\/+|\/+$/g, "");
  const id = crypto.randomBytes(16).toString("hex");
  const key = `${id}-${filename}`;
  return cleanPrefix ? `${cleanPrefix}/${key}` : key;
}

/**
 * Get public URL for S3 object
 */
export function getPublicUrlForKey(key) {
  if (env.awsPublicBaseUrl) return `${env.awsPublicBaseUrl.replace(/\/+$/g, "")}/${key}`;
  const bucket = required("AWS_BUCKET_NAME", env.awsBucketName);
  const region = required("AWS_REGION", env.awsRegion);
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

/**
 * Upload buffer/file to S3
 * @param {Object} params
 * @param {Buffer} params.buffer - File buffer
 * @param {string} params.contentType - MIME type
 * @param {string} params.originalName - Original filename
 * @param {string} params.prefix - S3 folder prefix (optional)
 * @param {string} params.cacheControl - Cache-Control header (optional)
 * @returns {Promise<{bucket, key, url}>}
 */
export async function uploadBufferToS3({
  buffer,
  contentType,
  originalName,
  prefix,
  cacheControl = "public, max-age=31536000, immutable"
}) {
  const bucket = required("AWS_BUCKET_NAME", env.awsBucketName);
  const filename = sanitizeFilename(originalName);
  const customPrefix = prefix || env.awsObjectPrefix;
  const key = buildKey({ prefix: customPrefix, filename });

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType || "application/octet-stream",
      CacheControl: cacheControl
      // If your bucket policy allows public reads you can optionally set:
      // ACL: "public-read"
    })
  );

  return { bucket, key, url: getPublicUrlForKey(key) };
}

/**
 * Upload product image to S3
 * @param {Buffer} buffer - Image buffer
 * @param {string} originalName - Original filename
 * @returns {Promise<{bucket, key, url}>}
 */
export async function uploadProductImage(buffer, originalName) {
  return uploadBufferToS3({
    buffer,
    contentType: "image/jpeg",
    originalName,
    prefix: "products"
  });
}

/**
 * Upload category image to S3
 * @param {Buffer} buffer - Image buffer
 * @param {string} originalName - Original filename
 * @returns {Promise<{bucket, key, url}>}
 */
export async function uploadCategoryImage(buffer, originalName) {
  return uploadBufferToS3({
    buffer,
    contentType: "image/jpeg",
    originalName,
    prefix: "categories"
  });
}

/**
 * Delete file from S3
 * @param {string} key - S3 object key
 * @returns {Promise<void>}
 */
export async function deleteFromS3(key) {
  const bucket = required("AWS_BUCKET_NAME", env.awsBucketName);
  await s3.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    })
  );
}

/**
 * Extract S3 key from public URL
 * @param {string} url - Public URL
 * @returns {string|null} S3 key or null
 */
export function extractKeyFromUrl(url) {
  if (!url) return null;
  try {
    // Handle format: https://bucket.s3.region.amazonaws.com/key
    const match = url.match(/amazonaws\.com\/(.+)$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

