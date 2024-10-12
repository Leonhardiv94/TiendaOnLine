// src/user.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  fechaNacimiento: Date,
  email:  { type: String, unique: true },
  contrasena: String,
});

const User = mongoose.model('User', UserSchema);

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, fechaNacimiento, email, contrasena } = req.body;

  try {
    const newUser = new User({ nombre, apellido, fechaNacimiento, email, contrasena });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
