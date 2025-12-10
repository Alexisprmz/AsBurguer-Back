"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConfig_1 = __importDefault(require("./config/server/ServerConfig"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const AuthRouter_1 = __importDefault(require("./routes/AuthRouter"));
const SocketRouter_1 = __importDefault(require("./routes/SocketRouter"));
const MenuRouter_1 = __importDefault(require("./routes/MenuRouter"));
const OrderRouter_1 = __importDefault(require("./routes/OrderRouter"));
const GraphicsRouter_1 = __importDefault(require("./routes/GraphicsRouter"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const FavoritesRouter_1 = __importDefault(require("./routes/FavoritesRouter"));
const server = ServerConfig_1.default.instance;
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS - Permitir solicitudes desde http://localhost:4200
server.app.use((0, cors_1.default)({ origin: 'http://localhost:4200', credentials: true }));
server.app.options('*');
// Rutas de servicios
server.app.use("/auth", AuthRouter_1.default);
server.app.use("/menu", MenuRouter_1.default);
server.app.use("/order", OrderRouter_1.default);
server.app.use("/graphics", GraphicsRouter_1.default);
server.app.use("/user", UserRouter_1.default);
server.app.use("/favorites", FavoritesRouter_1.default);
// Rutas de los sockets
server.app.use("/socket", SocketRouter_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
