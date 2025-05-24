import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
};

// Crear la cola de correos
export const emailQueue = new Queue("emailQueue", { connection });

// Agregar un trabajo a la cola
export const enqueueEmail = async (email: string, otp: string, nameUs: string) => {
  await emailQueue.add("send_email", { email, otp, nameUs });
};
