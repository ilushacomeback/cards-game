import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  telegramId: number;
  username?: string;
  firstName: string;
  score: number;
  cards: string[];
  lastActive: Date;
  level: number;
  balance: number;
  gamesPlayed: number;
  gamesWon: number;
}

const UserSchema: Schema = new Schema(
  {
    telegramId: {
      type: Number,
      required: true,
      unique: true,
    },
    username: String,
    firstName: String,
    score: {
      type: Number,
      default: 0,
    },
    cards: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
      default: [],
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    level: {
      type: Number,
      default: 1,
    },
    balance: {
      type: Number,
      default: 0,
    },
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    gamesWon: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', UserSchema);
