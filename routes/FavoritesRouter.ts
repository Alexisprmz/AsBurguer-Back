import { Router } from "express";
import { FavoritesController } from '../app/controllers/FavoritesController';
import { Middleware } from "../config/server/Middleware";

const router = Router();

router.get('/get', Middleware(1), FavoritesController.getFavorites);
router.post('/toggle', Middleware(1), FavoritesController.toggle);

export default router;
