import { Request, Response } from 'express';
import { FavoritesModel } from '../models/FavoritesModel';

class FavoritesController {

    static async getFavorites(req: Request, res: Response): Promise<void> {
        const idusers = req.query.idusers as string;
        
        // 🔍 LOG PARA DEBUG
        console.log('Parámetros recibidos:', req.query);
        console.log('ID Usuario:', idusers);
        console.log('Tipo:', typeof idusers);

        if (!idusers) {
            res.status(400).json({ error: true, msg: "Falta el ID del usuario" });
            return;
        }

        try {
            const result = await FavoritesModel.getFavorites(idusers);
            
            console.log('✅ Resultados obtenidos:', result.length, 'favoritos');
            
            res.json({
                error: false,
                msg: "Lista de favoritos obtenida",
                data: result
            });

        } catch (error) {
            console.error("Error en getFavorites:", error);
            res.status(500).json({
                error: true,
                msg: "Error al obtener favoritos"
            });
        }
    }

    static async toggle(req: Request, res: Response): Promise<void> {
        const { idusers, idproducts } = req.body;
        
        // 🔍 LOG PARA DEBUG
        console.log('Toggle - Body recibido:', req.body);
        console.log('Usuario:', idusers);
        console.log('Producto:', idproducts);

        if (!idusers || !idproducts) {
            res.status(400).json({ error: true, msg: "Faltan datos (usuario o producto)" });
            return;
        }

        try {
            const result = await FavoritesModel.toggleFavorite(idusers, idproducts);
            res.json(result);

        } catch (error) {
            console.error("Error en toggleFavorite:", error);
            res.status(500).json({
                error: true,
                msg: "Error interno al cambiar el estado de favorito"
            });
        }
    }
}

export { FavoritesController };