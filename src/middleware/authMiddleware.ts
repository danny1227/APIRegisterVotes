import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    const secret = 'your_jwt_secret_key';  
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;  
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
