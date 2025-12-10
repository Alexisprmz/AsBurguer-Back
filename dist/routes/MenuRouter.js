"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MenuController_1 = require("../app/controllers/MenuController");
const Middleware_1 = require("../config/server/Middleware");
const router = (0, express_1.Router)();
router.get('/viewIngredients', (0, Middleware_1.Middleware)(1), MenuController_1.MenuController.viewIngredients);
exports.default = router;
