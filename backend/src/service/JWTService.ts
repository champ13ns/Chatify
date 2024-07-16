import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GLOBAL_VAR } from "./../utils/index";
class JWTService {
  async createToken(payload: any) {
    const token = jwt.sign(payload, GLOBAL_VAR.JWT_SECRET || "");
    return token;
  }

  async verifyToken(token: string) {
    return jwt.verify(token, GLOBAL_VAR?.JWT_SECRET || "");
  }

  async generateSalt() {
    const salt = await bcrypt.genSalt();
    return salt;
  }

  async hashPassword(password: string, salt: string) {
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  }

  async comparePassword(plainPass: string, salt: string, hashedPass: string) {
    const encodePass = await this.hashPassword(plainPass, salt);
    return encodePass === hashedPass;
  }
}

export { JWTService };
