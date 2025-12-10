import {MenuService} from '../services/MenuService';

class MenuModel{
    static async viewIngredients(){
        return await MenuService.viewIngredients();
    }
}
export {MenuModel};