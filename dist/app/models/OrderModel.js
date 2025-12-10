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
exports.OrderModel = void 0;
const OrderService_1 = require("../services/OrderService");
class OrderModel {
    static createOrder(total, origin, comments, client, users_idusers, order_details) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield OrderService_1.OrderService.createOrder(total, origin, comments, client, users_idusers, order_details);
            if (res.error)
                return res;
            const msj = res.msg;
            return {
                error: false,
                msg: {
                    idorder: msj,
                    client: client,
                    total: total,
                    status: 0,
                    comment: comments,
                },
            };
        });
    }
    static viewOrder(idorder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderService_1.OrderService.viewOrder(idorder);
        });
    }
    static viewOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderService_1.OrderService.viewOrders();
        });
    }
    static updateStatus(idorder, status, users_idusers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderService_1.OrderService.updateStatus(idorder, status, users_idusers);
        });
    }
    static lastOrder(iduser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderService_1.OrderService.lastOrder(iduser);
        });
    }
    static misOrdenes(idUSer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OrderService_1.OrderService.misOrdenes(idUSer);
        });
    }
}
exports.OrderModel = OrderModel;
