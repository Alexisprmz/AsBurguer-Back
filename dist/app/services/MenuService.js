"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const DatabaseMethods_1 = require("../../config/database/DatabaseMethods");
const CustomExceptions_1 = require("../../config/tools/CustomExceptions");
class MenuService {
    static viewIngredients() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseMethods_1.DatabaseMethods.query({
                query: "SELECT p.idproducts, p.name, p.price, p.description, p.category_idcategory, c.name as name_category FROM products as p JOIN category c ON c.idcategory = p.category_idcategory WHERE p.active = 1 ORDER BY p.category_idcategory, p.name",
                params: []
            });
            if (res.error)
                return res;
            const msj = res.msg;
            if (typeof msj === 'string') {
                throw new CustomExceptions_1.CustomExceptions('004');
            }
            for (const [key, value] of Object.entries(msj)) {
                const res2 = yield DatabaseMethods_1.DatabaseMethods.query({
                    query: `
                    SELECT i.idingredients, i.name, i.extra, i.cost, i.stock, i.required 
                    FROM products_ingredients pi 
                    JOIN ingredients i ON i.idingredients = pi.ingredients_idingredients 
                    WHERE pi.products_idProducts = ? 
                    ORDER BY i.name`,
                    params: [value.idproducts]
                });
                msj[Number(key)].ingredients = res2.msg;
            }
            return { error: false, msg: msj };
        });
    }
}
exports.MenuService = MenuService;
