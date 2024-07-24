import { Redis } from "ioredis";

const redisClient = new Redis();

redisClient.set('helo','world')
redisClient.get('helo')

export { redisClient }