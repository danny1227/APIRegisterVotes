import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  role?: string;  // Especificamos que el payload puede contener el rol
}

const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as CustomJwtPayload; 

    if (!user || !user.role || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado. No tienes el rol necesario.' });
    }

    next();
  };
};

export default roleMiddleware;
