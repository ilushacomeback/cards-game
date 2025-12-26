import { Schema, model, Types, Document } from 'mongoose';
import { IUser } from './user.model.js';

export interface IToken extends Document {
  dbId: Types.ObjectId;
  refreshToken: string;
  userAgent?: string;
  ip?: string;
  expiresAt: Date;
  createdAt: Date;
}
export type TokenDocumentPopulated = Omit<IToken, 'dbId'> & {
  dbId: IUser;
};

const tokenSchema = new Schema<IToken>(
  {
    dbId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    userAgent: String,
    ip: String,
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = model<IToken>('Token', tokenSchema);
