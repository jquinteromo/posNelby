import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/userService";
import { generateOtp } from "../services/otpService";
import { enqueueEmail } from "../workers/emailWorker";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, nameUs } = req.body;

  try {
    if (!email || !password || !nameUs) {
      res.status(400).json({ message: "Todos los campos son obligatorios." });
      return;
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "El usuario ya está registrado." });
      return;
    }

    const otp = generateOtp();
    await enqueueEmail(email, otp, nameUs);

    await createUser({ email, password, nameUs, verified: false });

    res.status(200).json({ message: "Usuario registrado. Verifica tu correo electrónico." });
  } catch (error) {
    console.error("❌ Error en el proceso de registro:", error);
    res.status(500).json({ message: "Error en el proceso de registro." });
  }
};
