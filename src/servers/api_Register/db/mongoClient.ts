import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_NELBY_URI

if (!uri) {
  throw new Error("❌ URI de MongoDB no está configurada en las variables de entorno.");
}

const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB.");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1); // Salir si no se conecta (seguridad en producción)
  }
}

// Conectar automáticamente cuando se importe este archivo
connectToMongoDB();

export default client;