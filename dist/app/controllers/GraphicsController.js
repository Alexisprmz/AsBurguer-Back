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
exports.GraphicsController = void 0;
const GraphicsModel_1 = require("../models/GraphicsModel");
const Utils_1 = require("../../config/tools/Utils");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class GraphicsController {
    static totalSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield GraphicsModel_1.GraphicsModel.totalSales();
            res.json(result);
        });
    }
    static bestSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { mes } = params;
            if (Utils_1.Utils.hasEmptyParams([mes]))
                throw new CustomExceptions_1.CustomExceptions("007");
            const result = yield GraphicsModel_1.GraphicsModel.bestSeller(mes);
            res.json(result);
        });
    }
    static bestClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield GraphicsModel_1.GraphicsModel.bestClient();
            res.json(result);
        });
    }
    static sales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield GraphicsModel_1.GraphicsModel.sales();
            res.json(result);
        });
    }
    static avgTime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield GraphicsModel_1.GraphicsModel.avgTime();
            res.json(result);
        });
    }
}
exports.GraphicsController = GraphicsController;
