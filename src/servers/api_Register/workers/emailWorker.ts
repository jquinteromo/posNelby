import { Worker, Job } from "bullmq";
import { sendOtpEmail } from "../services/emailService";

// Tipo explícito de datos del trabajo
type EmailJobData = {
  email: string;
  otp: string;
  nameUs: string;
};

// Worker que procesa trabajos de la cola "emailQueue"
const emailWorker = new Worker<EmailJobData>(
  "emailQueue",
  async (job: Job<EmailJobData>) => {
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
