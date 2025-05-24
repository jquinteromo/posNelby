import { Router } from "express";
import { createUser, getUserByEmail } from "../services/userService";
import { generateOtp } from "../services/otpService";
import { enqueueEmail } from "../workers/emailQueue"; // <--- Importa de emailQueue.ts

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, nameUs } = req.body;

  if (!email || !password || !nameUs) {
     res.status(400).json({ message: "Todos los campos son obligatorios." });
     return;
  }

  // Verificar si el usuario ya existe
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    res.status(409).json({ message: "El usuario ya está registrado." });
    return;
  }

  // Generar OTP y enviar correo
  const otp = generateOtp();
  await enqueueEmail(email, otp, nameUs);

  // Registrar usuario (no verificado)
  await createUser({ email, password, nameUs, verified: false });

  res.status(201).json({ message: "Usuario registrado y correo de verificación enviado." });
}); 

export default router;
