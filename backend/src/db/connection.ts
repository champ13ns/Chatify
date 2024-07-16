import mongoose from "mongoose";
import { GLOBAL_VAR } from "../utils";

const connectDB = async () => {
    try {
        if(GLOBAL_VAR.DB_CONNECTIION)
        await mongoose.connect(GLOBAL_VAR.DB_CONNECTIION)
        console.log("DB Connected");
    } catch (error) {
        console.log("error while connecting db...")
    }
}

export { connectDB }
