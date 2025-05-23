import Redis, { Command } from "ioredis";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

// Configuración de Redis
const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});

// Configuración del rate limiter
const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (command: string, ...args: string[]): Promise<any> => {
      // Construir el comando correctamente y enviarlo
      const redisCommand = new Command(command, args);
      return await redisClient.sendCommand(redisCommand);
    },
  }),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 solicitudes por IP
  message: "Has excedido el límite de solicitudes. Intenta nuevamente más tarde.",
});

// Exporta el rateLimiter para usarlo en tus rutas
export default rateLimiter;
