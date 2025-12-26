import mongoose from 'mongoose';
import { envConfig } from './env.config.js';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};
