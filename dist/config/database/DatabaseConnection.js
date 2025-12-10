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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const Environment_1 = require("../../global/Environment");
const dbConfig = {
    host: Environment_1.HOST_MYSQL,
    port: Environment_1.PORT_MYSQL,
    user: Environment_1.USER_MYSQL,
    password: Environment_1.PASSWORD_MYSQL,
    database: Environment_1.DATABASE_MYSQL
};
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(dbConfig);
        return connection;
    }
    catch (error) {
        throw new Error('Database connection failed');
    }
});
exports.connect = connect;
