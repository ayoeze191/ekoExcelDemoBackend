import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
  console.log("Connecting to MongoDB...");
  try {
    const dbName = process.env.DB_NAME || "ekoexcel";
    const uri =
      process.env.MONGO_URI ||
      `mongodb://localhost:27017/${dbName}?authSource=admin`;

    // Connect to MongoDB
    await mongoose.connect(uri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");

    // Monitor connection events
    mongoose.connection.on("connected", () =>
      console.log("MongoDB connection established")
    );
    mongoose.connection.on("error", (err) =>
      console.error("MongoDB connection error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB connection closed")
    );

    // Graceful shutdown on Nitro app close
    nitroApp.hooks.hookOnce("close", async () => {
      console.log("Closing MongoDB connection...");
      await mongoose.connection.close();
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if MongoDB fails to connect
  }
});
