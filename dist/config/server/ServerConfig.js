"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Environment_1 = require("../../global/Environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
class ServerConfig {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, {
            cors: { origin: true, credentials: true },
        });
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = ServerConfig;
