import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';



dotenv.config();

const app = express();
app.use(cors({
 
     origin: [
      "http://localhost:3000", // Origen permitido
      "http://192.168.56.1:3000",
       "https://pos-nelby-7qou.vercel.app"
    ],
  methods: ['GET', 'POST'],
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_NELBY_URI!;
const client = new MongoClient(uri);

app.post('/api/auth', async (req: Request, res: Response):Promise<void> => {
  console.log("Conectado a monfgo db")
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);

    await client.connect();
    const db = client.db("NELBYDEV");
    const collection = db.collection("Users");

    const user = await collection.findOne({ email, password });

    if (user) {
      res.status(200).send('Usuario autenticado');
      return 
    } else {
       res.status(401).send('Credenciales incorrectas');
      return 
    }
  } catch (error) {
    console.error('Error al verificar credenciales:', error);
     res.status(500).send('Error interno del servidor');
     return
  }
});

// Usa la instancia completa de express en createServer
const server = http.createServer(app);

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
