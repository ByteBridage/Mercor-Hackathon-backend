import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for the model
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // Additional fields if needed
});

// Define the interface for the document
export interface UserDocument extends Document {
  name: string;
  email: string;
  // Additional fields if needed
}

// Create and export the model
export const UserModel = mongoose.model<UserDocument>('User', UserSchema);