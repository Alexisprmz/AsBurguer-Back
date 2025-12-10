"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../app/controllers/AuthController");
const Middleware_1 = require("../config/server/Middleware");
const router = (0, express_1.Router)();
//Definicion de rutas, tipo de peticion, necesidad de autenticacion asi como origen y metodo
router.post('/signin', (0, Middleware_1.Middleware)(0), AuthController_1.AuthController.signIn);
router.post('/signup', (0, Middleware_1.Middleware)(0), AuthController_1.AuthController.signUp);
exports.default = router;
