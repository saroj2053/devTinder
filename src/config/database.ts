import mongoose from 'mongoose';
import "dotenv/config";

const DB = (process.env.DATABASE_URI as string)
    .replace('<USER>', process.env.DATABASE_USER as string)
    .replace('<PASSWORD>', process.env.DATABASE_PASSWORD as string);

const connectDB = async () => {
    await mongoose.connect(DB);
};

export default connectDB;