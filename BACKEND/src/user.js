import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: { type: String, unique: true },
  fechaNacimiento: Date,
  email:  { type: String, unique: true },
  contrasena: String,
  tipoUsuario: { type: String, default: 'general' },
});

const User = mongoose.model('User', UserSchema);


// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  console.log(req.body); // Para ver qué datos llegan
  const { nombre, apellido, cedula, fechaNacimiento, email, contrasena, tipoUsuario } = req.body;

  try {

    // Verifica que todos los campos requeridos están presentes
    if (!nombre || !apellido || !cedula || !fechaNacimiento || !email || !contrasena || !tipoUsuario) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      nombre,
      apellido,
      cedula,
      fechaNacimiento,
      email,
      contrasena: hashedPassword,
      tipoUsuario,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Ruta para autenticar un usuario
router.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Busca al usuario por correo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Compara la contraseña ingresada con la almacenada (encriptada)
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si la autenticación es exitosa
    res.status(200).json({ 
      message: 'Ingreso exitoso',
      nombre: user.nombre,
      apellido: user.apellido,
      tipoUsuario: user.tipoUsuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;