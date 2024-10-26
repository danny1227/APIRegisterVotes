import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = Router();


let users: User[] = [];
let memberNumberCounter = 1;  // Contador para el número de colegiado

// Ruta para registrar un usuario
router.post('/register', async (req: Request, res: Response) => {
  const { member, username, dpi, email, birthdate, password, role } = req.body;

  // Verificar si ya existe un usuario con el mismo email o DPI
  const existingUser = users.find(u => u.email === email || u.dpi === dpi);
  if (existingUser) {
    return res.status(400).json({ message: 'Ya existe un usuario con el mismo correo electrónico o DPI.' });
  }

  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear un nuevo usuario
  const newUser = new User(member, username, dpi, email, birthdate, hashedPassword, role);
  users.push(newUser);
  console.log(users);
  // mensaje de usuario creado
  res.status(201).json({ message: 'Usuario registrado con éxito.'});
});

// Ruta para iniciar sesión y generar un token JWT
router.post('/login', async (req: Request, res: Response) => {
  const {  member, dpi, birthdate, password  } = req.body;
  console.log(req.body);
  console.log(users); 
  // Buscar usuario por email
  const user = users.find(u => u.member === member);
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado.' });
  console.log(user);
   // Buscar usuario por email
   const dpif = users.find(u => u.dpi === dpi);
   if (!dpif) return res.status(400).json({ message: 'Usuario no encontrado.' });
   console.log(dpif);
  
   const birthdatef = users.find(u => u.birthdate === birthdate);
   if (!birthdatef) return res.status(400).json({ message: 'Usuario no encontrado.' });
   console.log(birthdatef);

  // Verificar si la contraseña es correcta
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta.' });
  console.log(validPassword);

  // Generar un token JWT
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';  // Debe estar en las variables de entorno
  const token = jwt.sign({ member: user.member, role: user.role }, secret, { expiresIn: '1h' });

  res.status(200).json({ token });
});

export default router;
