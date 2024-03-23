import { Schema, Document } from 'mongoose';


export const ImagePostSchema = new Schema({
    image: { type: String }
});


export interface ImagePost extends Document {
    image: string;

}
