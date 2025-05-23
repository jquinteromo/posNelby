// src/servers/api_Register/redisClient.ts
import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME || undefined,
  password: process.env.REDIS_PASSWORD || undefined,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
});

redisClient.on("connect", () => {
  console.log("✅ Conectado a Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Error en Redis:", err);
});

export default redisClient;
