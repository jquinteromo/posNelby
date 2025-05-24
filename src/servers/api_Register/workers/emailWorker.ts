import { Worker, Job } from "bullmq";
import { sendOtpEmail } from "../services/emailService";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
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

    // 👇 Cargar y compilar el template
    const templatePath = path.resolve(
      __dirname,
      "../../../templates/welcome.html"
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(htmlTemplate);

    const imageUrl =
      "https://pos-nelby-7qou.vercel.app/Icons_login/iconNelby.png";

    const htmlToSend = template({
      nameUs,
      verificationCode: otp,
      imageUrl,
    });

    await sendOtpEmail(email, "Código de Verificación", htmlToSend);
  },
  { connection }
);
