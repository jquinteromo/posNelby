import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import dotenv from "dotenv";

dotenv.config();

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Si usas SSL, cámbialo a true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función para enviar el correo de verificación
export const sendOtpEmail = async (email: string, otp: string, nameUs: string) => {
  const templatePath = path.resolve(__dirname, "../../../templates/welcome.html");
  const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  const template = handlebars.compile(htmlTemplate);
  const htmlToSend = template({ nameUs, verificationCode: otp, imageUrl: "https://pos-nelby-7qou.vercel.app/Icons_login/iconNelby.png" });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "¡Bienvenido a Nelby!",
    html: htmlToSend,
  });
};
