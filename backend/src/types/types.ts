import { z } from "zod";
import { Request } from "express";

export const LoginInputs = z.object({
    email : z.string().email({message : 'Must be of type Email'}).trim(),
    password : z.string({message : 'Must be of type string'}).trim()
})

export const SignUpInputs = z.object({
    email : z.string().email({message : 'Must be of type Email'}).trim(),
    password : z.string({message : 'Must be of type string'}).min(6, {message : "Password must be atleast 6 digits long"}).max(20, {message : "Password must be atleast 20 digits long"}),
    username : z.string().max(15),
    firstName : z.string().min(3).max(20),
    lastName : z.string().min(3).max(20)
})


export type AuthenticatedRequest = Request | {
    firstName : string,
    lastName : string,
    email : string,
    username : string
}
