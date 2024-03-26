import { Schema, Document, model } from 'mongoose';
import { Comment } from './comment.schema'; 

export interface Post extends Document {
    imageSrc: string[];
    authorId: string;
    text: string;
    plants: string[];
    likes: string[];
    shares: string[];
    comments: Comment[];
    createdAt: Date; // Alterado para o tipo Date
}

export const PostSchema = new Schema<Post>({
    imageSrc: [String],
    authorId: String,
    text: String,
    plants: [String],
    likes: [String],
    shares: [String],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now } // Definindo o campo createdAt com o tipo Date e valor padrão Date.now
});

export const PostModel = model<Post>('Post', PostSchema);
