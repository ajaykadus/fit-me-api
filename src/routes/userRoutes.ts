import { Router } from 'express';
import {
  getUsers,
  createUser,
  fetchUsers,
} from '../controllers/userController';
import { User } from '../types/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_secret_key';

const router = Router();

const users = []; // This should be replaced with a database in a real-world application

// Signup endpoint
router.post('/signup', (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ name, password: hashedPassword });
  res.status(200).send({ message: 'User registered successfully!' });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const users = await fetchUsers();
  const user = users.find((u: User) => u.name === name);

  if (!user) {
    return res.status(404).send({ message: 'User not found!' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ message: 'Invalid Password!' });
  }

  const token = jwt.sign({ id: user.name }, SECRET_KEY, {
    expiresIn: 86400,
  }); // 24 hours
  res.status(200).send({ auth: true, token: token });
});

router.get('/', getUsers);
router.post('/create', createUser);

export default router;
