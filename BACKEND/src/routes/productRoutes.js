import express from 'express';

const router = express.Router();

// Definir la ruta para obtener productos
router.get('/api/products', (req, res) => {
  // Aquí manejas la lógica de obtener productos de la base de datos
  res.json({ message: 'Lista de productos' });
});


export default router;