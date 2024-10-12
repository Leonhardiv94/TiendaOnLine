/*import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nombre, apellido, fechaNacimiento, email, contrasena } = req.body;
  
  try {
    const newUser = new User({ nombre, apellido, fechaNacimiento, email, contrasena });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
    console.log("usuario registrado");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;*/
