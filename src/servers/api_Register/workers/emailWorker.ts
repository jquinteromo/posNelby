import { Worker,Queue } from "bullmq";
import { sendOtpEmail } from "../services/emailService";

export const emailQueue = new Queue("emailQueue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS === "true" ? {} : undefined,
    maxRetriesPerRequest: null,
  },
});

export const enqueueEmail = (email: string, otp: string, nameUs: string) => {
  return emailQueue.add("send_email", { email, otp, nameUs });
};

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, otp, nameUs } = job.data;
    await sendOtpEmail(email, otp, nameUs);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      tls: process.env.REDIS_TLS === "true" ? {} : undefined,
      maxRetriesPerRequest: null,
    },
  }
);
