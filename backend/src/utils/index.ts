import dotenv from 'dotenv'

dotenv.config()

export const GLOBAL_VAR = {
    JWT_SECRET : process.env.JWT_SECRET,
    DB_CONNECTIION : process.env.DB_CONNECTION_URI,
    PORT : process.env.PORT
}