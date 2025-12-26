import { model, Schema, Document } from 'mongoose';

export interface ICard extends Document {
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  attack: number;
  health: number;
  rating: number;
  defence: number;
}

const cardSchema = new Schema<ICard>({
  name: { type: String, required: true },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary'],
    required: true,
  },
  attack: Number,
  health: Number,
  rating: Number,
  defence: Number,
});

export const Card = model('Card', cardSchema);
