import { Schema, Document } from 'mongoose';


export const ResponseSchema = new Schema({
    AuthorId: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: [String], default: [] },
});

export interface Response extends Document {
    AuthorId: string;
    text: string;
    likes: string[];
}
