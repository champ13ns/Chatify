import { userModel } from "../db/model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserRepo {
  async findUserByEmail(email: string) {
    return await userModel.findOne({ email: email });
  }
 
 async findUserByUserName(username : string) {
    return await userModel.findOne({username})
 }

 async getUser(email : string){
    return await userModel.findOne({email : email})
 }

 

  async createNewUser({
    email,
    hashedPass,
    firstName,
    lastName,
    username,
    salt
  }: {
    email: string;
    hashedPass: string;
    firstName: string;
    lastName: string;
    username: string;
    salt : string
  }) {
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password : hashedPass,
      username,
      salt 
    });
    return newUser;
  }

}

export { UserRepo };
