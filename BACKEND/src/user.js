// src/user.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: { type: String, unique: true },
  fechaNacimiento: Date,
  email:  { type: String, unique: true },
  contrasena: String,
});

const User = mongoose.model('User', UserSchema);

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, cedula, fechaNacimiento, email, contrasena } = req.body;

  try {
    const newUser = new User({ nombre, apellido, cedula, fechaNacimiento, email, contrasena });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un único usuario por cédula
router.get('/cedula/:cedula', async (req, res) => {
  try {
    const user = await User.findOne({ cedula: req.params.cedula }); // Busca el usuario por cédula
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un usuario por cédula
router.delete('/cedula/:cedula', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ cedula: req.params.cedula }); // Busca y elimina el usuario por cédula
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un usuario por cédula
router.put('/cedula/:cedula', async (req, res) => {
  const { nombre, apellido, fechaNacimiento, email, contrasena } = req.body; // Obtener datos del cuerpo de la solicitud

  try {
    const user = await User.findOneAndUpdate(
      { cedula: req.params.cedula }, // Busca el usuario por cédula
      { nombre, apellido, fechaNacimiento, email, contrasena }, // Nuevos datos
      { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user); // Retorna el usuario actualizado
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
