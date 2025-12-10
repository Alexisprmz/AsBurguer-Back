"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_MYSQL = exports.PASSWORD_MYSQL = exports.USER_MYSQL = exports.PORT_MYSQL = exports.HOST_MYSQL = exports.SERVER_PORT = void 0;
// Define el puerto en el que el servidor escuchará las solicitudes.
// Primero intenta obtener el valor del puerto desde una variable de entorno (process.env.PORT).
// Si no está definido, utiliza el puerto 3000 por defecto.
exports.SERVER_PORT = Number(process.env.PORT) || 3000;
// Define el nombre del host para la conexión a la base de datos MySQL
exports.HOST_MYSQL = "localhost";
// Define el puerto de MySQL (expuesto por Docker)
exports.PORT_MYSQL = 3307;
// Define el nombre de usuario para la conexión a la base de datos MySQL
exports.USER_MYSQL = "admin";
// Define la contraseña para el usuario de la base de datos MySQL
exports.PASSWORD_MYSQL = "1234567890";
// Define el nombre de la base de datos a la que se conectará la aplicación MySQL
exports.DATABASE_MYSQL = "distribuidos";
