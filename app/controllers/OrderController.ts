import { OrderModel } from "../models/OrderModel";
import { Utils } from "../../config/tools/Utils";
import { CustomExceptions } from "../../config/tools/CustomExceptions";

class OrderController {
  static async createOrder(req: any, res: any) {
    const { total, origin, comments, client, users_idusers, order_details } =
      req.body;
    if (Utils.hasEmptyParams([total, client, users_idusers, order_details])) throw new CustomExceptions("007");

    const result = await OrderModel.createOrder(
      total,
      origin,
      comments,
      client,
      users_idusers,
      order_details
    );

    res.json(result);
  }
  static async viewOrder(req: any, res: any) {
    const keyParams = req.query.params;
    let params;
    params = JSON.parse(keyParams);

    const { idorder } = params;
    if (Utils.hasEmptyParams([idorder])) throw new CustomExceptions('007');
    const result = await OrderModel.viewOrder(idorder);
    res.json(result);
  }
  static async viewOrders(req: any, res:any){
    const result =  await OrderModel.viewOrders();
    res.json(result);
  }
  static async updateStatus(req:any, res:any){
    const keyParams = req.query.params;
    let params;
    params = JSON.parse(keyParams);
    
    const {idorder,status,users_idusers} = params;
    if (Utils.hasEmptyParams([idorder,status, users_idusers]))
        throw new CustomExceptions("007");
  

      const result = await OrderModel.updateStatus(
        idorder,
        status,
        users_idusers
      );
  

      res.json(result);
  }
static async lastOrder(req:any,res:any){
    const keyParams = req.query.params;
    let params;
    params = JSON.parse(keyParams);
    const {iduser} = params;
    if (Utils.hasEmptyParams([iduser])) throw new CustomExceptions('007');
    const result = await OrderModel.lastOrder(iduser);
    res.json(result);
}

  static async misOrdenes(req: any, res: any){
    const keyParams = req.query.params;
    let params;
    params = JSON.parse(keyParams);
    
    const { iduser } = params;
    if (Utils.hasEmptyParams([iduser])) throw new CustomExceptions('007');
    
    const result = await OrderModel.misOrdenes(iduser);
    res.json(result);
  }
}
export { OrderController };
