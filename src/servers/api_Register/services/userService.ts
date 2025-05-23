import { MongoClient } from "mongodb";
import client from "../db/mongoClient";

const db = client.db("NELBYDEV");
const collection = db.collection("Users");

// Crear usuario (pre-registro)
export const createUser = async (user: { email: string; password: string; nameUs: string; verified: boolean }) => {
  await collection.insertOne(user);
};

// Obtener usuario por email
export const getUserByEmail = async (email: string) => {
  return await collection.findOne({ email });
};

// Verificar usuario (cambiar a verificado)
export const verifyUser = async (email: string) => {
  await collection.updateOne({ email }, { $set: { verified: true } });
};
