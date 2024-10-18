import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './user.js';
import productRoutes from './product.js';
import userDetailRoutes from './routes/user-details.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, '../../FRONTEND/dist')));

// Redirigir todas las rutas al archivo index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../FRONTEND/dist/index.html'));
});

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user-details', userDetailRoutes);

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
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
