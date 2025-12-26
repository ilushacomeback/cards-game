import { Card } from '../models/card.model.js';

export const getRandomCards = async (count = 5) => {
  return Card.find().limit(count);
};

export const createCard = async (data: Partial<typeof Card>) => {
  const card = new Card(data);
  return card.save();
};
