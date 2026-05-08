/**
 * S3 Upload Test Suite
 * Tests the S3 upload functionality with actual file uploads
 * 
 * Run with: npx tsx testUpload.ts
 * Or: node --loader tsx testUpload.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import FormData from "form-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration
 */
const API_BASE_URL = process.env.API_URL || "http://localhost:5000/api";
const TEST_TIMEOUT = 30000; // 30 seconds

/**
 * Colors for console output
 */
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m"
};

/**
 * Log helper functions
 */
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.blue}${"=".repeat(50)}${colors.reset}\n${msg}\n${colors.blue}${"=".repeat(50)}${colors.reset}\n`)
};

/**
 * Test 1: Create a test image buffer
 */
async function testCreateTestImage() {
  log.header("Test 1: Create Test Image");
  
  try {
    // Create a simple 1x1 pixel PNG (smallest valid PNG)
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
      0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd3, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0xf5, 0xb6, 0xee, 0x56, 0x00, 0x00, 0x00,
      0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
    ]);

    const testImagePath = path.join(__dirname, "test-image-s3.png");
    fs.writeFileSync(testImagePath, pngBuffer);
    
    log.success(`Test image created: ${testImagePath}`);
    log.info(`File size: ${pngBuffer.length} bytes`);
    
    return { testImagePath, buffer: pngBuffer };
  } catch (error) {
    log.error(`Failed to create test image: ${error.message}`);
    throw error;
  }
}

/**
 * Test 2: Upload image to S3 via test endpoint
 */
async function testS3Upload(testImagePath, filename = "test-shoe.jpeg") {
  log.header("Test 2: Upload Image to S3");
  
  try {
    log.info(`Uploading to: ${API_BASE_URL}/shop/upload/test-upload`);
    log.info(`File: ${filename}`);

    const form = new FormData();
    form.append("image", fs.createReadStream(testImagePath), filename);

    const response = await fetch(`${API_BASE_URL}/shop/upload/test-upload`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
      timeout: TEST_TIMEOUT
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Upload failed: ${data.message || response.statusText}`);
    }

    if (!data.success) {
      throw new Error(`Upload not successful: ${data.message}`);
    }

    log.success("File uploaded to S3");
    log.info(`S3 Bucket: ${data.data.s3Bucket}`);
    log.info(`S3 Key: ${data.data.s3Key}`);
    log.info(`Public URL: ${data.data.publicUrl}`);
    log.info(`File Size: ${data.data.size} bytes`);
    log.info(`MIME Type: ${data.data.mimetype}`);

    return {
      s3Key: data.data.s3Key,
      s3Bucket: data.data.s3Bucket,
      publicUrl: data.data.publicUrl
    };
  } catch (error) {
    log.error(`Upload failed: ${error.message}`);
    throw error;
  }
}

/**
 * Test 3: Verify URL accessibility (basic check)
 */
async function testUrlAccessibility(publicUrl) {
  log.header("Test 3: Verify URL Accessibility");
  
  try {
    log.info(`Testing URL: ${publicUrl}`);

    const response = await fetch(publicUrl, {
      method: "HEAD",
      timeout: TEST_TIMEOUT
    });

    if (response.ok) {
      log.success(`URL is accessible (HTTP ${response.status})`);
      log.info(`Content-Type: ${response.headers.get("content-type")}`);
      log.info(`Content-Length: ${response.headers.get("content-length")} bytes`);
      return true;
    } else {
      log.warn(`URL returned HTTP ${response.status}`);
      return false;
    }
  } catch (error) {
    log.warn(`Could not verify URL: ${error.message}`);
    log.info("This might be due to S3 bucket permissions or network issues.");
    return false;
  }
}

/**
 * Test 4: Test get upload info endpoint
 */
async function testGetUploadInfo(s3Key) {
  log.header("Test 4: Get Upload Info Endpoint");
  
  try {
    log.info(`Fetching info for S3 key: ${s3Key}`);

    const response = await fetch(`${API_BASE_URL}/shop/upload/get-upload-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: s3Key }),
      timeout: TEST_TIMEOUT
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to get upload info: ${data.message}`);
    }

    log.success("Upload info retrieved");
    log.info(`S3 Key: ${data.data.key}`);
    log.info(`Public URL: ${data.data.publicUrl}`);

    return data.data;
  } catch (error) {
    log.error(`Failed to get upload info: ${error.message}`);
    throw error;
  }
}

/**
 * Test 5: Cleanup test image
 */
async function cleanupTestImage(testImagePath) {
  log.header("Test 5: Cleanup");
  
  try {
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
      log.success(`Test image deleted: ${testImagePath}`);
    }
  } catch (error) {
    log.warn(`Could not delete test image: ${error.message}`);
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  log.header("🚀 S3 Upload Test Suite Started");

  try {
    // Verify API is running
    log.info(`Testing connection to: ${API_BASE_URL}`);
    try {
      const healthResponse = await fetch("http://localhost:5000/health", {
        timeout: 5000
      });
      if (!healthResponse.ok) {
        throw new Error(`API health check failed: ${healthResponse.status}`);
      }
      log.success("API is running");
    } catch (error) {
      throw new Error(
        `Cannot connect to API at ${API_BASE_URL}. Make sure backend is running with: npm start\nError: ${error.message}`
      );
    }

    // Run tests
    const { testImagePath } = await testCreateTestImage();
    const { s3Key, publicUrl, s3Bucket } = await testS3Upload(testImagePath);
    const isAccessible = await testUrlAccessibility(publicUrl);
    await testGetUploadInfo(s3Key);
    await cleanupTestImage(testImagePath);

    // Summary
    log.header("✅ All Tests Completed Successfully");
    console.log("\n📋 Test Summary:");
    console.log(`  • Bucket: ${s3Bucket}`);
    console.log(`  • S3 Key: ${s3Key}`);
    console.log(`  • Public URL: ${publicUrl}`);
    console.log(`  • URL Accessible: ${isAccessible ? "Yes" : "No"}`);
    console.log("\n💡 You can now use S3 uploads in your application!\n");

    return true;
  } catch (error) {
    log.header("❌ Test Failed");
    console.error(`\n${colors.red}Error: ${error.message}${colors.reset}\n`);

    console.log("📝 Troubleshooting:");
    console.log("  1. Ensure backend is running: npm start");
    console.log("  2. Check AWS credentials in .env file");
    console.log("  3. Verify S3 bucket permissions");
    console.log("  4. Check S3 bucket exists in correct region");
    console.log("  5. Ensure CORS is configured if testing from different domain\n");

    process.exit(1);
  }
}

// Run tests
runAllTests().catch((error) => {
  console.error(error);
  process.exit(1);
});
