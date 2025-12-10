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
exports.UserController = void 0;
const UserModel_1 = require("../models/UserModel");
const Utils_1 = require("../../config/tools/Utils");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
const AuthModel_1 = require("../models/AuthModel");
class UserController {
    static createUser(req, res) {
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
    static viewUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield UserModel_1.UserModel.viewUsers();
            res.json(result);
        });
    }
    static viewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { idusers } = params;
            if (Utils_1.Utils.hasEmptyParams([idusers]))
                throw new CustomExceptions_1.CustomExceptions('007');
            const result = yield UserModel_1.UserModel.viewUser(idusers);
            res.json(result);
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { idusers, name, password, phone, rol } = params;
            if (Utils_1.Utils.hasEmptyParams([idusers, name, password, phone, rol]))
                throw new CustomExceptions_1.CustomExceptions("007");
            const result = yield UserModel_1.UserModel.updateUser(idusers, name, password, phone, rol);
            res.json(result);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { idusers } = params;
            if (Utils_1.Utils.hasEmptyParams([idusers]))
                throw new CustomExceptions_1.CustomExceptions("007");
            const result = yield UserModel_1.UserModel.deleteUser(idusers);
            res.json(result);
        });
    }
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyParams = req.query.params;
            let params;
            params = JSON.parse(keyParams);
            const { idusers, name, phone } = params;
            if (Utils_1.Utils.hasEmptyParams([idusers, name, phone]))
                throw new CustomExceptions_1.CustomExceptions("007");
            const result = yield UserModel_1.UserModel.updateProfile(idusers, name, phone);
            res.json(result);
        });
    }
}
exports.UserController = UserController;
