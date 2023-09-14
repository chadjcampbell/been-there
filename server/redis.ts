import Redis from "ioredis";
require("dotenv").config();

export const redisClient = new Redis(process.env.REDIS_UPSTASH!);
