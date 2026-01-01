
import { Document, Schema, model } from "mongoose";
import mongoose from "mongoose";
export interface IUser  extends Document{
    name: string;
    email: string;
    password?: string;
    
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const User = mongoose.models.user || mongoose.model<IUser>('User', userSchema);
export { User };
