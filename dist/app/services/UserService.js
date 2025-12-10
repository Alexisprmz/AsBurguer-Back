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
exports.UserService = void 0;
const DatabaseMethods_1 = require("../../config/database/DatabaseMethods");
const Utils_1 = require("../../config/tools/Utils");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class UserService {
    static viewUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT u.idusers, u.name, u.phone, u.rol FROM users AS u WHERE u.rol NOT IN (4)",
                params: [],
            });
            return res;
        });
    }
    static viewUser(idusers) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT u.idusers, u.name, u.phone, u.rol FROM users AS u WHERE u.idusers=?",
                params: [idusers],
            });
            if (res.error)
                return res;
            const msj = res.msg;
            if (typeof msj === "string") {
                throw new CustomExceptions_1.CustomExceptions("004");
            }
            if (!msj)
                throw new CustomExceptions_1.CustomExceptions("004");
            return { error: false, msg: msj };
        });
    }
    static updateUser(idusers, name, password, phone, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_with_hash = yield Utils_1.Utils.hash(password);
            const queries = [
                {
                    query: "UPDATE `users` SET name=?, password=?,phone=?,rol=? WHERE idusers=?",
                    params: [name, password_with_hash, phone, rol, idusers]
                },
            ];
            return yield DatabaseMethods_1.DatabaseMethods.save_transaction(queries);
        });
    }
    static updateProfile(idusers, name, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = [
                {
                    query: "UPDATE `users` SET name=?, phone=? WHERE idusers=?",
                    params: [name, phone, idusers]
                },
            ];
            return yield DatabaseMethods_1.DatabaseMethods.save_transaction(queries);
        });
    }
    static deleteUser(idusers) {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = [
                {
                    query: "UPDATE `users` SET rol=4 WHERE idusers=?",
                    params: [idusers]
                },
            ];
            return yield DatabaseMethods_1.DatabaseMethods.save_transaction(queries);
        });
    }
}
exports.UserService = UserService;
