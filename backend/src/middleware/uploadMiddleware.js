import multer from "multer";

const storage = multer.memoryStorage();

function imageFileFilter(_req, file, cb) {
  const type = String(file.mimetype || "");
  if (type.startsWith("image/")) return cb(null, true);
  const err = new Error("Only image uploads are allowed");
  err.statusCode = 400;
  return cb(err);
}

export const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
}).single("image");
