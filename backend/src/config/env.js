import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/shoestore",
  skipDb: String(process.env.SKIP_DB || "").toLowerCase() === "true",
  jwtSecret: process.env.JWT_SECRET || "change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsObjectPrefix: process.env.AWS_OBJECT_PREFIX || "",
  awsPublicBaseUrl: process.env.AWS_PUBLIC_BASE_URL || ""
};
