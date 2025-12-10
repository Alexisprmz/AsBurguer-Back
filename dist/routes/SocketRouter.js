"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServerConfig_1 = __importDefault(require("../config/server/ServerConfig"));
const router = (0, express_1.Router)();
// Ruta POST para manejar las solicitudes en la ruta '/comandas'
router.post('/comandas', (req, res) => {
    // Obtiene los datos del cuerpo de la solicitud
    const data = req.body;
    console.log(data);
    // Obtiene la instancia del servidor
    const server = ServerConfig_1.default.instance;
    // Emite los datos a todos los clientes conectados en el canal 'comanda'
    server.io.emit('comanda', data);
    // Responde con un JSON que indica éxito
    res.json(true);
});
// Ruta POST para manejar las solicitudes en la ruta '/graficas'
router.post('/graficas', (req, res) => {
    // Obtiene los datos del cuerpo de la solicitud
    const data = req.body;
    console.log(data);
    // Obtiene la instancia del servidor
    const server = ServerConfig_1.default.instance;
    // Emite los datos a todos los clientes conectados en el canal 'grafica'
    server.io.emit('grafica', data);
    // Responde con un JSON que indica éxito
    res.json(true);
});
// Ruta POST para manejar las solicitudes en la ruta '/usuarios'
router.post('/usuarios', (req, res) => {
    // Obtiene los datos del cuerpo de la solicitud
    const data = req.body;
    // Obtiene la instancia del servidor
    const server = ServerConfig_1.default.instance;
    // Emite los datos a todos los clientes conectados en el canal 'usuario'
    server.io.emit('usuario', data);
    // Responde con un JSON que indica éxito
    res.json(true);
});
exports.default = router;
