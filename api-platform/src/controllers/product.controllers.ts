import { Request, Response } from 'express'
import { Product } from '../database/models/Products';
import { ok } from 'assert';

export async function getAllProducts(req: Request, res: Response): Promise<Response | void> {
    try {
        const product = await Product.findAll();
        return res.status(200).send(product);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}

export async function getProductById(req: Request, res: Response): Promise<Response | void> {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ error: "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo" });
        }

        const product = await Product.findOne({
            where: {
              id
            }
        });

        if(!product){
            return res.status(500).json({ error: "Error interno del servidor al procesar la solicitud" });
          }

        return res.status(200).send(product);
    }
    catch (e) {
        return res.status(400).json(e);
    }
}

export async function createProduct(req: Request, res: Response): Promise<Response | void> {
    try {
        const { handle, title, description, sku, grams, stock, price, comparePrice, barcode } = req.body;
        if (!handle || !title || !description || !sku || !grams || !stock || !price || !comparePrice) {
            return res.status(404).json({ error: "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo" });
        }

        const product = await Product.create({
            handle, title, description, sku, grams, stock, price, comparePrice, barcode
        });

        if(!product){
            return res.status(500).json({ error: "Error interno del servidor al procesar la solicitud" });
        }

        return res.status(200).send({ ok : true });
    }
    catch (e) {
        return res.status(400).json(e);
    }
}

export async function updateProduct(req: Request, res: Response): Promise<Response | void> {
    try {
        const { id, handle, title, description, sku, grams, stock, price, comparePrice, barcode } = req.body;
        if (!id || !handle || !title || !description || !sku || !grams || !stock || !price || !comparePrice) {
            return res.status(404).json({ error: "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo" });
        }

        const product = await Product.update(
            { handle, title, description, sku, grams, stock, price, comparePrice, barcode },
            { 
                where: { 
                    id: id
                } 
            }
        );

        if(!product){
            return res.status(500).json({ error: "Error interno del servidor al procesar la solicitud" });
          }

        return res.status(200).send({ ok : true });
    }
    catch (e) {
        return res.status(400).json(e);
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<Response | void> {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ error: "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo" });
        }

        const deletedProductCount = await Product.destroy({
            where: {
                id: id
            }
        });

        if (deletedProductCount === 1) {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res;
    }
    catch (e) {
        return res.status(400).json(e);
    }
}
