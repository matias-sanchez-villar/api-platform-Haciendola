import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validationLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  body("email")
    .exists()
    .withMessage('El campo "email" es requerido')
    .isEmail()
    .withMessage('El "email" no es válido');
  body("password")
    .exists()
    .withMessage('El campo "password" es requerido')
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

export const validationNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  body("firstName").exists().withMessage('El campo "firstName" es requerido');
  body("lastName").exists().withMessage('El campo "lastName" es requerido');
  body("email")
    .exists()
    .withMessage('El campo "email" es requerido')
    .isEmail()
    .withMessage('El "email" no es válido');
  body("password")
    .exists()
    .withMessage('El campo "password" es requerido')
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

export const validationForgotPassword = (req: Request, res: Response, next: NextFunction) => {
  body('email')
    .exists().withMessage('El campo "email" es requerido')
    .isEmail().withMessage('El "email" no es válido');
  body('userId')
    .exists().withMessage('El campo "userId" es requerido')
    .isNumeric().withMessage('El "userId" debe ser un número entero');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

export const validationResetPassword = (req: Request, res: Response, next: NextFunction) => {
  body('email')
    .exists().withMessage('El campo "email" es requerido')
    .isEmail().withMessage('El "email" no es válido');
  body("password")
    .exists()
    .withMessage('El campo "password" es requerido')
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

