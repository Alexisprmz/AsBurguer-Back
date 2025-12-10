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
exports.GraphicsModel = void 0;
const GraphicsService_1 = require("../services/GraphicsService");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class GraphicsModel {
    static totalSales() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GraphicsService_1.GraphicsService.totalSales();
        });
    }
    static bestSeller(mes) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GraphicsService_1.GraphicsService.bestSeller();
            let count = 0;
            let labels = ["", "", ""];
            let data = ["", "", ""];
            if (res.error)
                return res;
            const msj = res.msg;
            if (typeof msj === 'string') {
                throw new CustomExceptions_1.CustomExceptions('004');
            }
            msj.forEach(element => {
                if (element.mes == mes) {
                    if (count <= 2) {
                        if (count == 0) {
                            labels[1] = "#1 " + element.categoria + ":" + element.producto;
                            data[1] = element.cantidad;
                        }
                        else if (count == 1) {
                            labels[0] = "#2 " + element.categoria + ":" + element.producto;
                            data[0] = element.cantidad;
                        }
                        else {
                            labels[2] = "#3 " + element.categoria + ":" + element.producto;
                            data[2] = element.cantidad;
                        }
                        count++;
                    }
                }
            });
            return { error: false, msg: { "labels": labels, "data": data } };
        });
    }
    static bestClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield GraphicsService_1.GraphicsService.bestClient();
            let count = 0;
            let labels = ["", "", ""];
            let data = ["", "", ""];
            if (res.error)
                return res;
            const msj = res.msg;
            if (typeof msj === 'string') {
                throw new CustomExceptions_1.CustomExceptions('004');
            }
            msj.forEach(element => {
                if (count <= 2) {
                    if (count == 0) {
                        labels[1] = "#1 " + element.client;
                        data[1] = element.compras;
                    }
                    else if (count == 1) {
                        labels[0] = "#2 " + element.client;
                        data[0] = element.compras;
                    }
                    else {
                        labels[2] = "#3 " + element.client;
                        data[2] = element.compras;
                    }
                    count++;
                }
            });
            return { error: false, msg: { "labels": labels, "data": data } };
        });
    }
    static sales() {
        return __awaiter(this, void 0, void 0, function* () {
            let labels = { 'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4, 'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8, 'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12 };
            let labelsAux = [];
            let data = [];
            const res = yield GraphicsService_1.GraphicsService.sales();
            if (res.error)
                return res;
            const msj = res.msg;
            if (typeof msj === 'string') {
                throw new CustomExceptions_1.CustomExceptions('004');
            }
            for (const [mes, num] of Object.entries(labels)) {
                let valor = 0;
                msj.forEach(element => {
                    if (element.mes == num)
                        valor = Number(element.total);
                });
                labelsAux.push(mes);
                data.push(valor);
            }
            return { error: false, msg: { "labels": labelsAux, "data": data } };
        });
    }
    static avgTime() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GraphicsService_1.GraphicsService.avgTime();
        });
    }
}
exports.GraphicsModel = GraphicsModel;
