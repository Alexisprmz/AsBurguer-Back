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
exports.Middleware = void 0;
const Jwt_1 = require("../../config/tools/Jwt");
const crypto_1 = __importDefault(require("crypto"));
const console_1 = require("console");
// Genera un hash MD5 de una cadena específica para autenticar solicitudes.
// La cadena original es 'Aqui va tu contraseña (Yo la encripte en MD5)'.
// La función 'crypto.createHash' crea un hash MD5, que se actualiza con la cadena proporcionada,
// y finalmente se convierte en una cadena hexadecimal.
const simpleAuth = crypto_1.default.createHash('md5').update('Aqui va tu contraseña (Yo la encripte en MD5)').digest('hex');
(0, console_1.log)(simpleAuth);
// Middleware de autenticación que verifica el tipo de autenticación basado en 'typeAuth'.
// 'typeAuth' determina el método de autenticación a usar:
// - 0: Autenticación simple basada en un hash MD5.
// - 1: Autenticación basada en un token JWT (JSON Web Token).
const Middleware = (typeAuth) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Respuesta de error estándar si la autenticación falla.
        const error_res = { error: true, msg: 'no_token' };
        try {
            // Obtiene los encabezados de la solicitud.
            const headers = req.headers;
            // Verifica el tipo de autenticación.
            if (typeAuth == 0) {
                // Si 'typeAuth' es 0, se usa autenticación simple basada en hash MD5.
                // Compara el valor del encabezado 'simple' con el hash MD5 predefinido.
                // Si no coinciden, devuelve un error 401 (No Autorizado).
                if (headers['simple'] !== simpleAuth)
                    return res.status(401).json(error_res);
            }
            else {
                // Si 'typeAuth' no es 0, se usa autenticación basada en JWT.
                // Verifica que el encabezado 'authorization' exista y que el token JWT sea válido.
                // La función 'Jwt.check' se encarga de validar el token JWT.
                // Si el token no está presente o no es válido, devuelve un error 401 (No Autorizado).
                if (!headers['authorization'] || !(yield Jwt_1.Jwt.check(headers['authorization'])))
                    return res.status(401).json(error_res);
            }
            // Si la autenticación es exitosa, pasa al siguiente middleware o controlador.
            next();
        }
        catch (error) {
            // En caso de error en el middleware, devuelve un error 500 (Error Interno del Servidor).
            return res.status(500).json(error_res);
        }
    });
};
exports.Middleware = Middleware;
