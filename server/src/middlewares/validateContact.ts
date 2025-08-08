import { Request, Response, NextFunction } from 'express';
import { IContact } from '../interfaces/IContact';

export const validateContact = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, subject, message }: IContact = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};