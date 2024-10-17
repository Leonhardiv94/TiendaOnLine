import express from 'express';
import User from '../../src/user.js'; // Asegúrate de que la ruta del modelo sea correcta

const router = express.Router();

// Ruta para obtener los detalles del usuario
router.get('/', async (req, res) => {
  try {
    // Asegúrate de que el token se verifique correctamente
    const userId = req.user ? req.user.id : null; // O el método que uses para obtener el ID del usuario

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no encontrado en el token' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Enviar detalles del usuario
    res.status(200).json({
      nombre: user.nombre,
      apellido: user.apellido,
      tipoUsuario: user.tipoUsuario,
    });
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error); // Esto se imprimirá en los logs del servidor
    res.status(500).json({ error: 'Error al procesar la solicitud del servidor' });
  }
});

export default router;
