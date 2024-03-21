import { Schema, Document } from 'mongoose';

export const PlantSchema = new Schema({
  name: String,
  scientific_name: String,
  description: String,
  tags: [String],
});

export interface Plant extends Document {
  name: string;
  scientific_name: string;
  description: string;
  tags: string[];
}
