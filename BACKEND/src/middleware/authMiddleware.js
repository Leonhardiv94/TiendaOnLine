import jwt from 'jsonwebtoken';
import User from '../user.js'; 

const authMiddleware = async (req, res, next) => {
  // Verificar que el token está en los headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'tuSecretoJWT'); // Usa la clave secreta con la que firmaste el token

    // Buscar al usuario en la base de datos
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Guardar el usuario en la solicitud para que otros middlewares o rutas puedan acceder
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' });
  }
};

export default authMiddleware;
