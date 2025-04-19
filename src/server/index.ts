import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// Habilitar CORS para las peticiones normales (REST, etc.)
app.use(cors({
  origin: 'https://pos-nelby-7qou.vercel.app/', // Cambia esto si usas otro puerto o dominio
  methods: ['GET', 'POST'],
  credentials: true
}));

const server = http.createServer(app);

// Socket.IO con CORS habilitado
const io = new Server(server, {
  cors: {
    origin: 'https://pos-nelby-7qou.vercel.app/', // Debe coincidir con tu frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  
  socket.on('sendMessage', (MessageSend: string) => {
    console.log('Message received:', MessageSend);
    
    io.emit('receiveMessage', MessageSend);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

