// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './user.js'; // Asegúrate de que la extensión .js esté incluida

// Configuración de dotenv para manejar variables de entorno
dotenv.config();

const app = express();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:4200', // La URL de tu aplicación Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Rutas
app.use('/api/users', userRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Manejo de errores global 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
