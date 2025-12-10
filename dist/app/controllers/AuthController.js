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
exports.AuthController = void 0;
const AuthModel_1 = require("../models/AuthModel");
const Utils_1 = require("../../config/tools/Utils");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class AuthController {
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // NOTA: las variables deben de llamarse igual que en las keys del json
                const { name, password } = req.body;
                // Aqui pones las variables que no deben estar vacias, nulas o indefinidas
                // NOTA: Se tienen que mandar en arreglo: [email, password]
                if (Utils_1.Utils.hasEmptyParams([name, password]))
                    throw new CustomExceptions_1.CustomExceptions("007");
                // Se manda a llamar el modelo y se envian las variables del body como lo pide el modelo
                const result = yield AuthModel_1.AuthModel.signIn(name, password);
                // Regresa en formato json el resultado del modelo
                res.json(result);
            }
            catch (error) {
                if (error instanceof CustomExceptions_1.CustomExceptions) {
                    res.status(400).json(error.GetOptions());
                }
                else {
                    res.status(500).json({ error: true, message: "Internal Server Error" });
                }
            }
        });
    }
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password, phone, rol } = req.body;
                if (Utils_1.Utils.hasEmptyParams([name, password, phone, rol]))
                    throw new CustomExceptions_1.CustomExceptions("007");
                const result = yield AuthModel_1.AuthModel.signUp(name, password, phone, rol);
                res.json(result);
            }
            catch (error) {
                if (error instanceof CustomExceptions_1.CustomExceptions) {
                    res.status(400).json(error.GetOptions());
                }
                else {
                    res.status(500).json({ error: true, message: "Internal Server Error" });
                }
            }
        });
    }
}
exports.AuthController = AuthController;
