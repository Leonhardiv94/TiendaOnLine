import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configuración de multer para almacenar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para la imagen
  }
});

const upload = multer({ storage });

// Modelo del producto
const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true }, // Guardará la ruta de la imagen
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  codigoBarras: { type: String, required: true, unique: true },
});

const Product = mongoose.model('Product', ProductSchema);

// Ruta para crear un nuevo producto con imagen
router.post('/crear', upload.single('imagen'), async (req, res) => {
  const { nombre, precio, descripcion, codigoBarras } = req.body;

  try {
    // Crea un nuevo producto con la ruta de la imagen
    const newProduct = new Product({
      nombre,
      imagen: req.file ? req.file.path : '', // Ruta de la imagen subida
      precio,
      descripcion,
      codigoBarras,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
