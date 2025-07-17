import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });
