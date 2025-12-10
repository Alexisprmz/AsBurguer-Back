import { Router } from "express";
import { OrderController } from "../app/controllers/OrderController";
import { Middleware } from "../config/server/Middleware";

const router = Router();

router.post('/createOrder',Middleware(1), OrderController.createOrder);
router.get('/viewOrder',Middleware(1), OrderController.viewOrder);
router.get('/viewOrders',Middleware(1), OrderController.viewOrders);
router.put('/updateStatus',Middleware(1), OrderController.updateStatus);
router.get('/lastOrder',Middleware(1), OrderController.lastOrder);
router.get('/myOrders', Middleware(1), OrderController.misOrdenes)


export default router;