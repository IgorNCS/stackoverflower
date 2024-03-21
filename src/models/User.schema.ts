import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

export interface User extends Document {
    name: string;
    email: string,
    password: string
}
