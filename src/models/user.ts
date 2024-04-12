// Import Mongoose
import mongoose from "mongoose";

// Define a schema for your data
const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true // Assuming email should be unique
  },
  count: {
    type: Number,
  }
});

UserModel.path('count').default(0);

export const User = mongoose.model('User', UserModel);

// Export the model

