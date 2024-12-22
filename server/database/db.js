import mongoose from 'mongoose'; // Import mongoose
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
// MongoDB Atlas connection URL
const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hcfos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB Atlas using mongoose
const Connection = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting to the database:', error.message);
  }
};

export { Connection }; // Named export
