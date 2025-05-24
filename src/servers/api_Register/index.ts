// import express, { Request, Response } from "express";
// import { MongoClient } from "mongodb";
// import cors from "cors";
// import http from "http";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import fs from "fs";
// import handlebars from "handlebars";
// import path from "path";
// import redis from "./redisCliente";
// import verifyCodeRoute from "./Rutes_api/verifyCode"; 


// redis.ping().then(() => {
//   console.log("✅ Conectado a Redis desde el servidor de registro");
// }).catch((err:Error) => {
//   console.error("❌ Error al conectar a Redis desde el servidor de registro:", err);
// });

// dotenv.config();
// const app = express();

// app.use(
//   cors({
//     // origin: "https://pos-nelby.vercel.app",
//     origin: 'http://localhost:3000',
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// const uri = process.env.MONGODB_BATAUTO_URI!;
// const client = new MongoClient(uri);

// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log(" Conectado a MongoDB");
//   } catch (error) {
//     console.error(" Error al conectar a MongoDB:", error);
//   }
// }

// // Llamamos a la conexión apenas se inicia el servidor
// connectToMongoDB();

// app.post(
//   "/api/register",
//   async (req: Request, res: Response): Promise<void> => {
//     console.log("Conectad a MongoDB");

//     const { email, password, nameUs } = req.body;

//     try {
//       console.log(`Email: ${email}, Password: ${password}`);

//       //VERIFICASIÓN CAMPOS VACIOS 
//       if (!email || !password || !nameUs) {
//         res.status(400).json({ message: "Todos los campos son obligatorios." });
//         return;
//       }

//       const db = client.db("NELBYDEV");
//       const collection = db.collection("Users");



//       //VERFICASION SI CORREO EXISTE
//       const userExists = await collection.findOne({ email:email });
//       if (userExists) {
//         res.status(409).json({ message: "El usuario ya está registrado." });
//         return;
//       }



//       //ENVIO CORREO DE VERIFICASION
//       const templatePath = path.resolve(
//         __dirname,
//         "../../../templates/welcome.html"
//       );
//       const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
//       const verificationCode = Math.floor(
//         100000 + Math.random() * 900000
//       ).toString();

//       const template = handlebars.compile(htmlTemplate);
      
//       const imageUrl =
//         "https://pos-nelby-7qou.vercel.app/Icons_login/iconNelby.png";
//       const htmlToSend = template({ nameUs, verificationCode, imageUrl });

//       const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: Number(process.env.SMTP_PORT),
//         secure: false,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       });

//       await transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to: email,
//         subject: "¡Bienvenido a Nelby!",
//         html: htmlToSend,
//       });

//       console.log("Correo de bienvenida enviado");
//       res.status(200).json({
//         message: "Usuario registrado y correo enviado correctamente.",
//       });

      
// //REGISTRO DE USUARIO 
//       const newUser = { email, password, nameUs };
//       await collection.insertOne(newUser);
//       console.log("Usuario registrado en la base de datos");



//     } catch (error) {
//       console.error(" Error en el proceso de registro:", error);
//       res.status(500).json({
//         message: "Ocurrió un problema durante el proceso de registro.",
//         error: (error as Error).message,
//       });
//     }
//   }
// );



// //RUTA ENVIO CODIGO VERIFICASIÒN
// app.use("/api", verifyCodeRoute);



// const server = http.createServer(app);

// const PORT = process.env.PORT || 3003;

// server.listen(PORT, () => {
//   console.log(`Servidor API corriendo en http://localhost:${PORT}`);
// });


import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import redisClient from "./redisClient";
import client from "./db/mongoClient";
import registerRoute from "./routes/registerRoute";
import verifyCodeRoute from "./routes/verifyCodeRoute" 
import "./workers/emailWorker";



dotenv.config();

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Origen permitido
      "http://192.168.56.1:3000",
       "https://pos-nelby-7qou.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Asegúrate de permitir tus headers necesarios
  })
);



redisClient.ping().then(() => {
  console.log("✅ Conectado a Redis desde el servidor de registro");
}).catch((err:Error) => {
  console.error("❌ Error al conectar a Redis desde el servidor de registro:", err);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.get("/ip", async (req, res) => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  console.log("📡 IP pública del servidor Render:", data.ip);
  res.json(data);
});

// Rutas
app.use("/api/register", registerRoute);
app.use("/api/verify", verifyCodeRoute);

const server = http.createServer(app);
const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});
