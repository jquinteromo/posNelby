import { Request, Response } from "express";
import { getUserByEmail, verifyUser } from "../services/userService";
import { validateOtp } from "../services/otpService";
import redisClient from "../redisClient";

export const verifyCode = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  try {
    // Verificar que el email y el código existan
    if (!email || !otp) {
      res.status(400).json({ message: "Correo y código son obligatorios." });
      return;
    }

    // Verificar si el usuario existe
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    // Verificar si el usuario ya está verificado
    if (user.verified) {
      res.status(400).json({ message: "El usuario ya está verificado." });
      return;
    }

    // Obtener OTP almacenado para el correo electrónico
    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp) {
      res.status(400).json({ message: "Código de verificación no encontrado o expirado." });
      return;
    }

    // Validar el código OTP
    const isOtpValid = validateOtp(otp, storedOtp); // Aquí usamos storedOtp
    if (!isOtpValid) {
      res.status(400).json({ message: "Código de verificación inválido." });
      return;
    }

    // Verificar usuario en la base de datos
    await verifyUser(email);
    res.status(200).json({ message: "Usuario verificado correctamente." });

    // Eliminar OTP del Redis después de la verificación
    await redisClient.del(`otp:${email}`);
  } catch (error) {
    console.error("❌ Error en el proceso de verificación de código:", error);
    res.status(500).json({
      message: "Error en el proceso de verificación.",
      error: (error as Error).message,
    });
  }
};

export default verifyCode;
