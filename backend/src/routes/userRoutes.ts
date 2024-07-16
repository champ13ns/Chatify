import express, {
  Request,
  Response,
} from "express";
import { LoginInputs, SignUpInputs } from "../types/types";
import { UserService } from "../service/userService";

const userRouter = express.Router();

const userServiceCtor = new UserService();

userRouter.post(
  "/login",
  async (req: Request, res: Response) => {
    try {
      const parsedInput = LoginInputs.safeParse((req?.body));
      if (parsedInput.success === false) {
        throw new Error(parsedInput.data);
      }
      const token = await userServiceCtor.Login(req.body);
      res.json(token)
    } catch (error : any) {
      res.status(500).json({message : error.message})
    }
  }
);

userRouter.post(
  "/signup",
  async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const parsedInput = SignUpInputs.safeParse((req?.body));
      console.log("parsedInputs are...",parsedInput);
      
      if (parsedInput.success === false) {
        throw new Error("Invalid inputs");
      }
      const user = await userServiceCtor.SignUp(parsedInput.data);
      res.json(user)
    } catch (error : any) {
      res.status(500).json({message : error.message})
    }
  }
);

export { userRouter };
