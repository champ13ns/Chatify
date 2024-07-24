import { UserRepo } from "../repository/userRepository";
import { JWTService } from "./JWTService";

class UserService {
    private readonly repoLayer: UserRepo
    private readonly jwtService: JWTService
  constructor(
  ) {
    this.repoLayer = new UserRepo();
    this.jwtService = new JWTService();
  }

  private async createToken(email : string, firstName : string, lastName : string, username : string) {
    const token = await this.jwtService.createToken({ email , firstName , lastName , username  });
    return token;
  }

  async Login({ email, password }: { email: string; password: string }) {
    const existingUser = await this.repoLayer.findUserByEmail(email);
    console.log("existing User is ",existingUser);
    
    if (!existingUser) throw new Error("Invalid Email or Password");
    const userDetails  = await this.repoLayer.getUser(email);
    const correctPass = await this.jwtService.comparePassword(password, <string>existingUser?.salt , <string>existingUser.password);
    if(correctPass === false) throw new Error("Invalid Email or Password");
    let token =''
    //@ts-ignore
     token = await this.createToken(userDetails?.email , userDetails?.firstName, userDetails?.lastName,userDetails?.username )
    return token;
  }

  async SignUp({
    email,
    password,
    firstName,
    lastName,
    username,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
  }) {
    const existingUserName = await UserRepo.findUserByUserName(username);
    if (existingUserName) throw new Error("Username already present!!");
    const user = await this.repoLayer.findUserByEmail(email);
    if (user) throw new Error("Email already present!!");
    const salt = await this.jwtService.generateSalt();
    console.log("salit is ....",salt);
    
    const hashedPass = await this.jwtService.hashPassword(password, salt);
    console.log("hashed Pass is ....",hashedPass);
    
    const userDetails = await this.repoLayer.createNewUser({
      email,
      hashedPass,
      firstName,
      lastName,
      username,
      salt,
    });
    let token =''
    //@ts-ignore
     token = await this.createToken(userDetails?.email , userDetails?.firstName, userDetails?.lastName,userDetails?.username )
    return token;
  }
}

export { UserService }
