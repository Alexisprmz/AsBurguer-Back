import { OrderService } from "../services/OrderService";

class OrderModel {
  static async createOrder(
    total: number,
    origin: string,
    comments: string,
    client: string,
    users_idusers: string,
    order_details: any
  ) {
    const res = await OrderService.createOrder(
      total,
      origin,
      comments,
      client,
      users_idusers,
      order_details
    );
    if (res.error) return res;

    const msj = res.msg;
    return {
      error: false,
      msg: {
        idorder: msj,
        client: client,
        total: total,
        status: 0,
        comment: comments,
      },
    };
  }
  static async viewOrder(idorder: string) {
    return await OrderService.viewOrder(idorder);
  }
  static async viewOrders(){
    return await OrderService.viewOrders();
  }
  static async updateStatus(idorder: string,status: number,users_idusers:string){
    return await OrderService.updateStatus(idorder,status,users_idusers);
  }
  static async lastOrder(iduser:string){
    return await OrderService.lastOrder(iduser);
  }

  static async misOrdenes(idUSer: string){
    return await OrderService.misOrdenes(idUSer);
  }
}
export { OrderModel };
