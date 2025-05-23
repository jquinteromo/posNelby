// src/servers/api_Register/workers/emailQueue.ts
import Queue from "bull";

// Configuración de la cola de correos
export const emailQueue = new Queue("emailQueue");

// Función para agregar correos a la cola
export const enqueueEmail = async (email: string, subject: string, html: string) => {
  await emailQueue.add({ email, subject, html });
};
