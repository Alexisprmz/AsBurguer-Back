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
exports.OrderController = void 0;
const OrderModel_1 = require("../models/OrderModel");
const Utils_1 = require("../../config/tools/Utils");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class OrderController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { total, origin, comments, client, users_idusers, order_details } = req.body;
            if (Utils_1.Utils.hasEmptyParams([total, client, users_idusers, order_details]))
                throw new CustomExceptions_1.CustomExceptions("007");
            const result = yield OrderModel_1.OrderModel.createOrder(total, origin, comments, client, users_idusers, order_details);
            res.json(result);
        });
    }
    static viewOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { idorder } = params;
            if (Utils_1.Utils.hasEmptyParams([idorder]))
                throw new CustomExceptions_1.CustomExceptions('007');
            const result = yield OrderModel_1.OrderModel.viewOrder(idorder);
            res.json(result);
        });
    }
    static viewOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield OrderModel_1.OrderModel.viewOrders();
            res.json(result);
        });
    }
    static updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { idorder, status, users_idusers } = params;
            if (Utils_1.Utils.hasEmptyParams([idorder, status, users_idusers]))
                throw new CustomExceptions_1.CustomExceptions("007");
            const result = yield OrderModel_1.OrderModel.updateStatus(idorder, status, users_idusers);
            res.json(result);
        });
    }
    static lastOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { iduser } = params;
            if (Utils_1.Utils.hasEmptyParams([iduser]))
                throw new CustomExceptions_1.CustomExceptions('007');
            const result = yield OrderModel_1.OrderModel.lastOrder(iduser);
            res.json(result);
        });
    }
    static misOrdenes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { iduser } = params;
            if (Utils_1.Utils.hasEmptyParams([iduser]))
                throw new CustomExceptions_1.CustomExceptions('007');
            const result = yield OrderModel_1.OrderModel.misOrdenes(iduser);
            res.json(result);
        });
    }
}
exports.OrderController = OrderController;
