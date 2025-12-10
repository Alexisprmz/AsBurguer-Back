import { UserService } from "../services/UserService";

class UserModel {
  
  static async viewUsers() {
    return await UserService.viewUsers();
  }
  static async viewUser(idusers: string) {
    return await UserService.viewUser(idusers);
  }
  static async updateUser(idusers: string,name:string,password: string,phone: string,rol: number){
    return await UserService.updateUser(idusers,name,password,phone,rol);
  }
  static async deleteUser(idusers: string){
    return await UserService.deleteUser(idusers);
  }

  static async updateProfile(idUSer:string, name: string, phone: string){
    return await UserService.updateProfile(idUSer, name, phone)
  }
}
export { UserModel };
