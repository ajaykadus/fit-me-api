import { Request, Response } from 'express';
import User from '../models/User';

export const fetchUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw Error('Failed to fetch users');
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
