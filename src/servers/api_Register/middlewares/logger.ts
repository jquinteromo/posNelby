import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";

// Configuración del archivo de logs
const logDirectory = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Configuración de Morgan para guardar logs en archivo
const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });

const logger = morgan("combined", { stream: accessLogStream });

// Middleware de logging para desarrollo
const devLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

export { logger, devLogger };