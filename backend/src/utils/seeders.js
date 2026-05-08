import bcrypt from "bcryptjs";
import { User, Cart } from "../models/index.js";

export const seedAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "password";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return existingAdmin;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "Admin"
    });

    // Create cart for admin (optional, but good practice)
    await Cart.create({ userId: admin.id });

    console.log("✓ Admin user created successfully");
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    
    return admin;
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    throw error;
  }
};
