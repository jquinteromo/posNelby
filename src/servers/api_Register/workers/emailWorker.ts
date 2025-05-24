// src/servers/api_Register/workers/emailWorker.ts
import { Worker, Job } from "bullmq";
import { sendOtpEmail } from "../services/emailService";
import dotenv from "dotenv";

dotenv.config();

type EmailJobData = {
  email: string;
  otp: string;
  nameUs: string;
};

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
  maxRetriesPerRequest: null,
};

const emailWorker = new Worker<EmailJobData>(
  "emailQueue",
  async (job: Job<EmailJobData>) => {
    const { email, otp, nameUs } = job.data;
    console.log("📬 Procesando trabajo:", job.data);

    // ✅ Esto ya usa el HTML desde el emailService
    await sendOtpEmail(email, otp, nameUs);
  },
  { connection }
);
