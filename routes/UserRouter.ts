import { Router } from "express";
import { UserController } from "../app/controllers/UserController";
import { Middleware } from "../config/server/Middleware";

const router = Router();

router.post('/createUser',Middleware(1), UserController.createUser);
router.get('/viewUser',Middleware(1), UserController.viewUser);
router.get('/viewUsers',Middleware(1), UserController.viewUsers);
router.put('/updateUser',Middleware(1), UserController.updateUser);
router.delete('/deleteUser',Middleware(1), UserController.deleteUser);
router.put('/updateProfile', Middleware(1), UserController.updateProfile);


export default router;