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
exports.OrderService = void 0;
const DatabaseMethods_1 = require("../../config/database/DatabaseMethods");
const Utils_1 = require("../../config/tools/Utils");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class OrderService {
    static createOrder(total, origin, comments, client, users_idusers, order_details) {
        return __awaiter(this, void 0, void 0, function* () {
            const idOrder = Utils_1.Utils.UUID();
            const queries = [];
            queries.push({
                query: "INSERT INTO `order`(`idorder`, `total`, `origin`, `comments`, `client`, `users_idusers`) VALUES (?,?,?,?,?,?)",
                params: [idOrder, total, origin, comments, client, users_idusers],
            });
            order_details.forEach((element) => {
                const idOrderDetails = Utils_1.Utils.UUID();
                queries.push({
                    query: "INSERT INTO `order_details`(`idorderdetail`, `unit_price`, `order_type`, `comments`, `order_idorder`, `products_idproducts`) VALUES (?,?,?,?,?,?)",
                    params: [
                        idOrderDetails,
                        element.unit_price,
                        element.order_type,
                        element.comments,
                        idOrder,
                        element.products_idproducts,
                    ],
                });
                element.not_ingredient.forEach((ingredient) => {
                    queries.push({
                        query: "INSERT INTO `not_ingredient`(`ingredients_idingredients`, `order_details_idorderdetail`, `type`) VALUES (?,?,?)",
                        params: [
                            ingredient.ingredients_idingredients,
                            idOrderDetails,
                            ingredient.type,
                        ],
                    });
                });
            });
            const res = yield DatabaseMethods_1.DatabaseMethods.save_transaction(queries);
            if (res.error)
                return res;
            return { error: false, msg: idOrder };
        });
    }
    static viewOrder(idorder) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT o.idorder, o.client, o.total, o.status, o.comments, MONTH(o.date) mes, od.idorderdetail, od.order_type, od.comments as comments_product, p.name product, c.name category FROM `order` AS o JOIN order_details od ON od.order_idorder = o.idorder JOIN products p ON p.idproducts=od.products_idproducts JOIN category c ON c.idcategory =p.category_idcategory WHERE idorder=?",
                params: [idorder],
            });
            if (res.error)
                return res;
            const msj = res.msg;
            if (typeof msj === "string") {
                throw new CustomExceptions_1.CustomExceptions("004");
            }
            if (!msj)
                throw new CustomExceptions_1.CustomExceptions("004");
            for (const [key, value] of Object.entries(msj)) {
                const res2 = yield DatabaseMethods_1.DatabaseMethods.query({
                    query: "SELECT ni.ingredients_idingredients, ni.type, i.name FROM not_ingredient ni JOIN ingredients i ON ni.ingredients_idingredients = i.idingredients WHERE order_details_idorderdetail=?",
                    params: [value.idorderdetail],
                });
                msj[Number(key)].ingredients = res2.msg;
            }
            return { error: false, msg: msj };
        });
    }
    static viewOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT o.idorder, o.client, o.total, o.status, o.comments, MONTH(o.date) mes FROM `order` AS o WHERE o.active=1 ORDER BY o.date ASC",
                params: [],
            });
            return res;
        });
    }
    static updateStatus(idorder, status, users_idusers) {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = [];
            switch (status) {
                case 1:
                    queries.push({
                        query: "UPDATE `order` SET status=?, start_order = CURRENT_TIMESTAMP() WHERE idorder=?",
                        params: [status, idorder],
                    });
                    queries.push({
                        query: "UPDATE `users` SET actual_order=? WHERE idusers=?",
                        params: [idorder, users_idusers],
                    });
                    break;
                case 2:
                    queries.push({
                        query: "UPDATE `order` SET status=?, finish_order = CURRENT_TIMESTAMP() WHERE idorder=?",
                        params: [status, idorder],
                    });
                    queries.push({
                        query: "UPDATE `users` SET actual_order=null WHERE idusers=?",
                        params: [users_idusers],
                    });
                    break;
                case 3:
                    queries.push({
                        query: "UPDATE `order` SET status=? WHERE idorder=?",
                        params: [status, idorder],
                    });
                    break;
                case 4:
                    queries.push({
                        query: "UPDATE `order` SET status=? WHERE idorder=?",
                        params: [status, idorder],
                    });
                    break;
            }
            return yield DatabaseMethods_1.DatabaseMethods.save_transaction(queries);
        });
    }
    static lastOrder(iduser) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query_one({
                query: "SELECT u.actual_order, o.status, o.client, o.total, MONTH(o.date), o.comments FROM users u JOIN `order` o ON o.idorder= u.actual_order WHERE u.idusers = ?",
                params: [iduser]
            });
            const msj = res.msg;
            if (!msj)
                return { error: false, msg: null };
            if (typeof msj === "string") {
                throw new CustomExceptions_1.CustomExceptions("004");
            }
            if (msj.status == 1) {
                return yield OrderService.viewOrder(msj.actual_order);
            }
        });
    }
    static misOrdenes(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT o.idorder, u.name AS client, o.total, o.status, o.comments, o.date FROM `order` AS o JOIN users u ON u.idusers = o.users_idusers WHERE o.users_idusers = ? AND o.active = 1 ORDER BY o.date DESC",
                params: [idUser],
            });
            return res;
        });
    }
}
exports.OrderService = OrderService;
