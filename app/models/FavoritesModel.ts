import { FavoritesService } from '../services/FavoritesService';
import { ResultSetHeader } from 'mysql2';
import { RowDataPacket } from 'mysql2/promise';

type ActionType = "added" | "removed";

interface ToggleResponse {
    error: boolean;
    action: ActionType;
    msg: string;
}

class FavoritesModel {

    static async getFavorites(idUser: string): Promise<RowDataPacket[]> {
        const dbResult = await FavoritesService.getFavorites(idUser);
        return dbResult; 
    }

    static async toggleFavorite(idUser: string, idProduct: string): Promise<ToggleResponse> {
        // 1. Verificar si ya es favorito
        const exists = await FavoritesService.checkIsFavorite(idUser, idProduct);

        let action: ActionType;
       
        let _dbResult: ResultSetHeader; 

        if (exists) {
            _dbResult = await FavoritesService.remove(idUser, idProduct);
            action = "removed";
        } else {
            _dbResult = await FavoritesService.add(idUser, idProduct);
            action = "added";
        }

        // 2. Construimos la respuesta limpia manualmente
        return {
            error: false,
            action: action,
            // Aquí aseguramos que msg sea SIEMPRE un string
            msg: action === "added" ? "Agregado a favoritos" : "Eliminado de favoritos"
        };
    }
}

export { FavoritesModel };