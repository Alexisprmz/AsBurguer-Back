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
exports.AuthModel = void 0;
const AuthService_1 = require("../services/AuthService");
const Utils_1 = require("../../config/tools/Utils");
const Jwt_1 = require("../../config/tools/Jwt");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class AuthModel {
    static signIn(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Manda a llamar el servicio para hacer la auntenticacion 
            const res = yield AuthService_1.AuthService.signIn(name, password);
            // Checa que no haya error y si si hay, manda el error
            if (res.error)
                return res;
            // Guardamos lo que viene en la key msg en una variable
            const msj = res.msg;
            // Si hay error puede que nos devuelva solamente un string, pero nosotros necesitamos un objeto
            // Entonces evaluamos que no sea un string
            if (typeof msj === 'string') {
                throw new CustomExceptions_1.CustomExceptions('004');
            }
            //borramos la contraseña del mensaje
            delete msj.password;
            // modelamos lo que queremos regresar
            return {
                error: false,
                msg: {
                    idusers: msj.idusers,
                    name: msj.name,
                    token: yield Jwt_1.Jwt.signIn(msj),
                    phone: msj.phone,
                    rol: msj.rol,
                    actual_order: msj.actual_order,
                },
            };
        });
    }
    static signUp(name, password, phone, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield Utils_1.Utils.UUID();
            const password_with_hash = yield Utils_1.Utils.hash(password);
            return AuthService_1.AuthService.signUp(name, password_with_hash, id, phone, rol);
        });
    }
}
exports.AuthModel = AuthModel;
