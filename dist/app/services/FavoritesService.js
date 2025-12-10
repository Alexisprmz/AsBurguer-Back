"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const DatabaseMethods_1 = require("../../config/database/DatabaseMethods");
class FavoritesService {
    /**
     * Obtener lista de productos favoritos de un usuario con información completa del producto.
     */
    static getFavorites(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('🔍 Buscando favoritos para usuario:', idUser);
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
            const response = yield DatabaseMethods_1.DatabaseMethods.query(query);
            if (response.error) {
                throw new Error(response.msg);
            }
            console.log('✅ Favoritos encontrados:', response.msg.length);
            return response.msg;
        });
    }
    /**
     * Agregar un producto a favoritos.
     */
    static add(idUser, idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                query: `
                INSERT INTO favorites (idfavorites, users_idusers, products_idproducts, created_at) 
                VALUES (UUID(), ?, ?, NOW())
            `,
                params: [idUser, idProduct]
            };
            const response = yield DatabaseMethods_1.DatabaseMethods.query(query);
            if (response.error) {
                throw new Error(response.msg);
            }
            return response.msg;
        });
    }
    /**
     * Eliminar un producto de favoritos.
     */
    static remove(idUser, idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                query: "DELETE FROM favorites WHERE users_idusers = ? AND products_idproducts = ?",
                params: [idUser, idProduct]
            };
            const response = yield DatabaseMethods_1.DatabaseMethods.query(query);
            if (response.error) {
                throw new Error(response.msg);
            }
            return response.msg;
        });
    }
    /**
     * Verificar si un producto ya está en favoritos.
     */
    static checkIsFavorite(idUser, idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                query: "SELECT idfavorites FROM favorites WHERE users_idusers = ? AND products_idproducts = ?",
                params: [idUser, idProduct]
            };
            const response = yield DatabaseMethods_1.DatabaseMethods.query_one(query);
            if (response.error) {
                throw new Error(response.msg);
            }
            return response.msg;
        });
    }
}
exports.FavoritesService = FavoritesService;
