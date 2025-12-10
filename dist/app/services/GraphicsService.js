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
exports.GraphicsService = void 0;
const DatabaseMethods_1 = require("../../config/database/DatabaseMethods");
class GraphicsService {
    static totalSales() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query_one({
                query: "SELECT SUM(total) total FROM `order` WHERE status=3",
                params: []
            });
            return res;
        });
    }
    static bestSeller() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT p.name AS producto, COUNT(*) AS cantidad, MONTH(o.date) AS mes, c.name AS categoria FROM order_details od INNER JOIN products p ON p.idproducts = od.products_idproducts INNER JOIN `order` o ON o.idorder = od.order_idorder JOIN category c ON p.category_idcategory = c.idcategory WHERE YEAR(o.date) = YEAR(NOW()) GROUP BY p.name, c.name, MONTH(o.date) ORDER BY cantidad DESC;",
                params: []
            });
        });
    }
    static bestClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT client, COUNT(*) compras, SUM(total) total_compras FROM `order`  GROUP BY client ORDER BY COUNT(*) DESC",
                params: []
            });
        });
    }
    static sales() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT SUM(o.total) total, MONTH(o.date) mes FROM `order` o  WHERE status=3 GROUP BY mes",
                params: []
            });
        });
    }
    static avgTime() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DatabaseMethods_1.DatabaseMethods.query_one({
                query: "SELECT AVG(TIMESTAMPDIFF(MINUTE, start_order, finish_order)) minutos from `order`",
                params: []
            });
        });
    }
}
exports.GraphicsService = GraphicsService;
