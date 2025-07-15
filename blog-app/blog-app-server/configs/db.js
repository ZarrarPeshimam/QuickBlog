



import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
    const db = mongoose.connection;

    db.on('connected', () => {
      console.log("✅ [connectDB] MongoDB connected to:", db.name);  // ✅ shows DB name
    });

    db.on('error', (err) => {
      console.error("❌ [connectDB] MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("❌ [connectDB] Initial connection failed:", error.message);
  }
};
export default connectDB;



