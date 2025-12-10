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
exports.UserModel = void 0;
const UserService_1 = require("../services/UserService");
class UserModel {
    static viewUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.viewUsers();
        });
    }
    static viewUser(idusers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.viewUser(idusers);
        });
    }
    static updateUser(idusers, name, password, phone, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.updateUser(idusers, name, password, phone, rol);
        });
    }
    static deleteUser(idusers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.deleteUser(idusers);
        });
    }
    static updateProfile(idUSer, name, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserService_1.UserService.updateProfile(idUSer, name, phone);
        });
    }
}
exports.UserModel = UserModel;
