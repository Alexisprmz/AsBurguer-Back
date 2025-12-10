"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FavoritesController_1 = require("../app/controllers/FavoritesController");
const Middleware_1 = require("../config/server/Middleware");
const router = (0, express_1.Router)();
router.get('/get', (0, Middleware_1.Middleware)(1), FavoritesController_1.FavoritesController.getFavorites);
router.post('/toggle', (0, Middleware_1.Middleware)(1), FavoritesController_1.FavoritesController.toggle);
exports.default = router;
