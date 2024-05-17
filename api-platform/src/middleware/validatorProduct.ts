import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validatorProduct = (req: Request, res: Response, next: NextFunction) => {
  body('handle')
    .exists().withMessage('El campo "handle" es requerido');
  body('title')
    .exists().withMessage('El campo "title" es requerido');
  body('description')
    .exists().withMessage('El campo "description" es requerido');
  body('sku')
    .exists().withMessage('El campo "sku" es requerido');
  body('grams')
    .exists().withMessage('El campo "grams" es requerido')
    .isNumeric().withMessage('El campo "grams" debe ser un número');
  body('stock')
    .exists().withMessage('El campo "stock" es requerido')
    .isNumeric().withMessage('El campo "stock" debe ser un número');
  body('price')
    .exists().withMessage('El campo "price" es requerido')
    .isNumeric().withMessage('El campo "price" debe ser un número');
  body('comparePrice')
    .exists().withMessage('El campo "comparePrice" es requerido')
    .isNumeric().withMessage('El campo "comparePrice" debe ser un número');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

export const validatorProductId = (req: Request, res: Response, next: NextFunction) => {
    body('id')
        .exists().withMessage('El campo "id" es requerido')
        .isNumeric().withMessage('El "id" debe ser un número entero');
    body('handle')
      .exists().withMessage('El campo "handle" es requerido');
    body('title')
      .exists().withMessage('El campo "title" es requerido');
    body('description')
      .exists().withMessage('El campo "description" es requerido');
    body('sku')
      .exists().withMessage('El campo "sku" es requerido');
    body('grams')
      .exists().withMessage('El campo "grams" es requerido')
      .isNumeric().withMessage('El campo "grams" debe ser un número');
    body('stock')
      .exists().withMessage('El campo "stock" es requerido')
      .isNumeric().withMessage('El campo "stock" debe ser un número');
    body('price')
      .exists().withMessage('El campo "price" es requerido')
      .isNumeric().withMessage('El campo "price" debe ser un número');
    body('comparePrice')
      .exists().withMessage('El campo "comparePrice" es requerido')
      .isNumeric().withMessage('El campo "comparePrice" debe ser un número');
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  };
