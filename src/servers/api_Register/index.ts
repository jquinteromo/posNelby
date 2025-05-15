import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://pos-nelby-7qou.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_BATAUTO_URI!;
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log(" Conectado a MongoDB");
  } catch (error) {
    console.error(" Error al conectar a MongoDB:", error);
  }
}

// Llamamos a la conexión apenas se inicia el servidor
connectToMongoDB();

app.post(
  "/api/register",
  async (req: Request, res: Response): Promise<void> => {
    console.log("Conectad a MongoDB");

    const { email, password, nameUs } = req.body;

    try {
      console.log(`Email: ${email}, Password: ${password}`);

      //VERIFICASIÓN CAMPOS VACIOS 
      if (!email || !password || !nameUs) {
        res.status(400).json({ message: "Todos los campos son obligatorios." });
        return;
      }

      const db = client.db("NELBYDEV");
      const collection = db.collection("Users");



      //VERFICASION SI CORREO EXISTE
      const userExists = await collection.findOne({ email:email });
      if (userExists) {
        res.status(409).json({ message: "El usuario ya está registrado." });
        return;
      }



      //ENVIO CORREO DE VERIFICASION
      const templatePath = path.resolve(
        __dirname,
        "../../../templates/welcome.html"
      );
      const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const template = handlebars.compile(htmlTemplate);
      
      const imageUrl =
        "https://pos-nelby-7qou.vercel.app/Icons_login/iconNelby.png";
      const htmlToSend = template({ nameUs, verificationCode, imageUrl });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "¡Bienvenido a Nelby!",
        html: htmlToSend,
      });

      console.log("Correo de bienvenida enviado");
      res.status(200).json({
        message: "Usuario registrado y correo enviado correctamente.",
      });

      
//REGISTRO DE USUARIO 
      const newUser = { email, password, nameUs };
      await collection.insertOne(newUser);
      console.log("Usuario registrado en la base de datos");



    } catch (error) {
      console.error(" Error en el proceso de registro:", error);
      res.status(500).json({
        message: "Ocurrió un problema durante el proceso de registro.",
        error: (error as Error).message,
      });
    }
  }
);

const server = http.createServer(app);

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
