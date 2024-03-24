import { Schema, Document, model } from 'mongoose';
import { Comment } from './comment.schema'; 

export const PostSchema = new Schema({
    imageSrc: [String],
    authorId: String,
    text: String,
    plants: [String],
    likes: [String],
    shares: [String],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] 
});

export interface Post extends Document {
    imageSrc: string[];
    authorId: string;
    text: string;
    plants: string[];
    likes: string[];
    shares: string[];
    comments: Comment[]; 
}

// Crie e exporte o modelo para os posts
export const PostModel = model<Post>('Post', PostSchema);
