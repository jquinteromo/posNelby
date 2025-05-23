import { Router } from "express";
import { getUserByEmail, verifyUser } from "../services/userService";
import { validateOtp } from "../services/otpService";
import redisClient from "../redisClient";  // Cliente Redis general

const router = Router();

router.post("/", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
     res.status(400).json({ message: "Correo y código son obligatorios." });
     return
  }

  const user = await getUserByEmail(email);
  if (!user) {
     res.status(404).json({ message: "Usuario no encontrado." });
    return
  }

  if (user.verified) {
     res.status(400).json({ message: "El usuario ya está verificado." });
    return
  }

  const storedOtp = await redisClient.get(`otp:${email}`);
  if (!storedOtp) {
     res.status(400).json({ message: "Código de verificación no encontrado o expirado." });
    return
  }

  if (!validateOtp(otp, storedOtp)) {
     res.status(400).json({ message: "Código de verificación inválido." });
    return
  }

  await verifyUser(email);
  await redisClient.del(`otp:${email}`);

  res.status(200).json({ message: "Usuario verificado correctamente." });
});

export default router;
