import app from "./app.js";
import { env } from "./config/env.js";
import { sequelize } from "./models/index.js";
import { logger } from "./utils/logger.js";
import { seedAdmin } from "./utils/seeders.js";

const start = async () => {
  try {
    if (!env.skipDb) {
      await sequelize.authenticate();
      await sequelize.sync();
      logger.info("Database connected");
      
      // Seed admin user
      await seedAdmin();
    } else {
      logger.warn("Starting without database (SKIP_DB=true)");
    }

    app.listen(env.port, () => logger.info(`API running on port ${env.port}`));
  } catch (error) {
    if (env.nodeEnv === "development") {
      logger.error("Database connection failed; starting API in degraded mode (development only).", error);
      app.listen(env.port, () => logger.info(`API running on port ${env.port}`));
      return;
    }

    logger.error("Startup failed", error);
    process.exit(1);
  }
};

start();
