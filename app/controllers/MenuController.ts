import {MenuModel} from '../models/MenuModel';

class MenuController{
    static async viewIngredients(req: any, res: any){
        const result = await MenuModel.viewIngredients();

        res.json(result);
    }
}
export {MenuController};