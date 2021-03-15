import { Request, Response, NextFunction } from 'express';

const admin: boolean = true;

const permissions = {
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    if (admin) {
      return next();
    } else {
      return res
        .status(401)
        .send({
          error: -1,
          descripcion: `Ruta ${req.originalUrl} no autorizada`,
        });
    }
  },
};

export default permissions;
