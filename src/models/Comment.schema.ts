import { Schema, Document } from 'mongoose';
import { Response, ResponseSchema } from './Response.schema';
import { Post, PostSchema } from './Post.schema';
 

export const CommentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Adicionando postId
    authorId: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: [String], default: [] },
    response: [{ type: Schema.Types.ObjectId, ref: 'Response' }] 
});

export interface Comment extends Document {
    authorCommentImage: string;
    authorCommentName: string;
    postId: string; // Atualizando a interface para incluir postId
    authorId: string;
    text: string;
    likes: string[];
    response: string[]; 
}
