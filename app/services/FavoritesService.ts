import { DatabaseMethods } from '../../config/database/DatabaseMethods';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

type UserID = number | string;
type ProductID = number | string;

class FavoritesService {

    /**
     * Obtener lista de productos favoritos de un usuario con información completa del producto.
     */
    static async getFavorites(idUser: UserID): Promise<RowDataPacket[]> {
        console.log('Buscando favoritos para usuario:', idUser);
        
        const query = {
            query: `
                SELECT 
                    f.idfavorites,
                    f.users_idusers,
                    f.products_idproducts,
                    f.created_at as favorite_created_at,
                    p.idproducts,
                    p.name,
                    p.price,
                    p.description,
                    p.category_idcategory,
                    p.active,
                    p.created_at as product_created_at,
                    p.updated_at as product_updated_at
                FROM favorites f
                INNER JOIN products p ON f.products_idproducts = p.idproducts
                WHERE f.users_idusers = ?
                ORDER BY f.created_at DESC
            `,
            params: [idUser]
        };

        const response: any = await DatabaseMethods.query(query);

        if (response.error) {
            throw new Error(response.msg);
        }

        console.log('Favoritos encontrados:', response.msg.length);
        return response.msg as RowDataPacket[];
    }

    /**
     * Agregar un producto a favoritos.
     */
    static async add(idUser: UserID, idProduct: ProductID): Promise<ResultSetHeader> {
        const query = {
            query: `
                INSERT INTO favorites (idfavorites, users_idusers, products_idproducts, created_at) 
                VALUES (UUID(), ?, ?, NOW())
            `,
            params: [idUser, idProduct]
        };
        
        const response: any = await DatabaseMethods.query(query);
        if (response.error) {
            throw new Error(response.msg); 
        }
        return response.msg as ResultSetHeader;
    }

    /**
     * Eliminar un producto de favoritos.
     */
    static async remove(idUser: UserID, idProduct: ProductID): Promise<ResultSetHeader> {
        const query = {
            query: "DELETE FROM favorites WHERE users_idusers = ? AND products_idproducts = ?",
            params: [idUser, idProduct]
        };
        
        const response: any = await DatabaseMethods.query(query);
        if (response.error) {
            throw new Error(response.msg); 
        }
        return response.msg as ResultSetHeader;
    }

    /**
     * Verificar si un producto ya está en favoritos.
     */
    static async checkIsFavorite(idUser: UserID, idProduct: ProductID): Promise<any> {
        const query = {
            query: "SELECT idfavorites FROM favorites WHERE users_idusers = ? AND products_idproducts = ?",
            params: [idUser, idProduct]
        };
        
        const response: any = await DatabaseMethods.query_one(query);
        if (response.error) {
            throw new Error(response.msg); 
        }
        return response.msg; 
    }
}

export { FavoritesService };