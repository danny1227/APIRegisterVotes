import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = Router();


let users: User[] = [];
let memberNumberCounter = 1;  // Contador para el número de colegiado

// Ruta para registrar un usuario (ejemplo simple)
router.post('/register', async (req: Request, res: Response) => {
  const { member, username, dpi, email, birthdate, password, role } = req.body;

  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear un nuevo usuario
  const newUser = new User(memberNumberCounter++, dpi, birthdate, username, email, hashedPassword, role);
  users.push(newUser);

  // Devolver la respuesta sin incluir la contraseña
  const userWithoutPassword = {
    member: newUser.member,
    username: newUser.username,
    dpi: newUser.dpi,
    email: newUser.email,
    birthdate: newUser.birthdate,
    role: newUser.role,
  };

  res.status(201).json({ message: 'Usuario registrado con éxito.', user: userWithoutPassword });
});

// Ruta para iniciar sesión y generar un token JWT
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Buscar usuario por email
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado.' });

  // Verificar si la contraseña es correcta
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta.' });

  // Generar un token JWT
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';  // Debe estar en las variables de entorno
  const token = jwt.sign({ member: user.member, role: user.role }, secret, { expiresIn: '1h' });

  res.status(200).json({ token });
});

export default router;
