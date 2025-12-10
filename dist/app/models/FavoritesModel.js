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
exports.FavoritesModel = void 0;
const FavoritesService_1 = require("../services/FavoritesService");
class FavoritesModel {
    static getFavorites(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResult = yield FavoritesService_1.FavoritesService.getFavorites(idUser);
            return dbResult;
        });
    }
    /**
     * Agrega o quita un producto de favoritos.
     */
    static toggleFavorite(idUser, idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Verificar si ya es favorito
            const exists = yield FavoritesService_1.FavoritesService.checkIsFavorite(idUser, idProduct);
            let action;
            // Usamos '_dbResult' para dejar claro que esto es info técnica de la DB (affectedRows, etc)
            // y NO lo que queremos enviar al usuario en el mensaje.
            let _dbResult;
            if (exists) {
                _dbResult = yield FavoritesService_1.FavoritesService.remove(idUser, idProduct);
                action = "removed";
            }
            else {
                _dbResult = yield FavoritesService_1.FavoritesService.add(idUser, idProduct);
                action = "added";
            }
            // 2. Construimos la respuesta limpia manualmente
            return {
                error: false,
                action: action,
                // Aquí aseguramos que msg sea SIEMPRE un string
                msg: action === "added" ? "Agregado a favoritos" : "Eliminado de favoritos"
            };
        });
    }
}
exports.FavoritesModel = FavoritesModel;
