import { JwtPayload } from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;  // Definir `user` como un string o el payload decodificado del token JWT
    }
  }
}
