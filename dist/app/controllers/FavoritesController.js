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
exports.FavoritesController = void 0;
const FavoritesModel_1 = require("../models/FavoritesModel");
class FavoritesController {
    static getFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idusers = req.query.idusers;
            // 🔍 LOG PARA DEBUG
            console.log('📥 Parámetros recibidos:', req.query);
            console.log('👤 ID Usuario:', idusers);
            console.log('📝 Tipo:', typeof idusers);
            if (!idusers) {
                res.status(400).json({ error: true, msg: "Falta el ID del usuario" });
                return;
            }
            try {
                const result = yield FavoritesModel_1.FavoritesModel.getFavorites(idusers);
                // 🔍 LOG PARA VER QUÉ SE OBTUVO
                console.log('✅ Resultados obtenidos:', result.length, 'favoritos');
                res.json({
                    error: false,
                    msg: "Lista de favoritos obtenida",
                    data: result
                });
            }
            catch (error) {
                console.error("❌ Error en getFavorites:", error);
                res.status(500).json({
                    error: true,
                    msg: "Error al obtener favoritos"
                });
            }
        });
    }
    /**
     * Toggle favorito
     */
    static toggle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idusers, idproducts } = req.body;
            // 🔍 LOG PARA DEBUG
            console.log('📥 Toggle - Body recibido:', req.body);
            console.log('👤 Usuario:', idusers);
            console.log('📦 Producto:', idproducts);
            if (!idusers || !idproducts) {
                res.status(400).json({ error: true, msg: "Faltan datos (usuario o producto)" });
                return;
            }
            try {
                const result = yield FavoritesModel_1.FavoritesModel.toggleFavorite(idusers, idproducts);
                res.json(result);
            }
            catch (error) {
                console.error("❌ Error en toggleFavorite:", error);
                res.status(500).json({
                    error: true,
                    msg: "Error interno al cambiar el estado de favorito"
                });
            }
        });
    }
}
exports.FavoritesController = FavoritesController;
