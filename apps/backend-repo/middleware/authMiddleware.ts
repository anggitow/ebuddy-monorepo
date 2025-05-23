import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebaseConfig';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).json({
      responseCode: false,
      responseMessage: 'Unauthorized',
      responseSystemMessage: 'No token provided',
      responseData: []
    });
    return;
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      (req as any).user = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(401).json({
        responseCode: false,
        responseMessage: 'Unauthorized',
        responseSystemMessage: 'Invalid token',
        responseData: []
      });
    });
};
