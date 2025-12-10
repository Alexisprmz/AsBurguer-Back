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
exports.AuthService = void 0;
const DatabaseMethods_1 = require("../../config/database/DatabaseMethods");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
const Utils_1 = require("../../config/tools/Utils");
class AuthService {
    static signIn(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Peticion a la base de datos Igualita a la de php
            const res = yield DatabaseMethods_1.DatabaseMethods.query_one({
                query: "SELECT * FROM users WHERE name = ? and rol NOT IN (4);",
                params: [name]
            });
            //console.log(res);
            // Checa que no haya error y si si hay, manda el error
            if (res.error)
                return res;
            // Guardamos lo que viene en la key msg en una variable
            const msj = res.msg;
            // Si hay error puede que nos devuelva solamente un string, pero nosotros necesitamos un objeto
            // Entonces evaluamos qu no sea un string
            if (typeof msj === 'string') {
                throw new CustomExceptions_1.CustomExceptions('004');
            }
            // Evaluamos si no viene null
            if (!msj)
                throw new CustomExceptions_1.CustomExceptions('004');
            // Checamos si la contraseña coincide
            if (!(yield Utils_1.Utils.verify(password, msj.password)))
                throw new CustomExceptions_1.CustomExceptions('005');
            return { error: false, msg: msj };
        });
    }
    static signUp(name, password, id, phone, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = [
                {
                    query: "INSERT INTO `users`(`idusers`, `name`, `password`, `phone`, `rol`) VALUES (?,?,?,?,?)",
                    params: [id, name, password, phone, rol]
                },
            ];
            return yield DatabaseMethods_1.DatabaseMethods.save_transaction(queries);
        });
    }
}
exports.AuthService = AuthService;
