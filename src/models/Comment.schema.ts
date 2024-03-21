import { Schema, Document } from 'mongoose';
import { Response, ResponseSchema } from './Response.schema'; 


export const CommentSchema = new Schema({
    AuthorId: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: [String], default: [] },
    response: [{ type: Schema.Types.ObjectId, ref: 'Response' }] 
});


export interface Comment extends Document {
    AuthorId: string;
    text: string;
    likes: string[];
    response: string[]; 
}
