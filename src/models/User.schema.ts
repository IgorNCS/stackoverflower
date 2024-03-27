import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    profileImage: String,
    name: String,
    email: String,
    password: String
});

export interface User extends Document {
    profileImage:string,
    name: string;
    email: string,
    password: string
}
