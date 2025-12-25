import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary'],
    required: true,
  },
  attack: Number,
  health: Number,
  rating: Number,
});

export const Card = mongoose.model('Card', cardSchema);
