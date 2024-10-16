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
  imagen: { type: String, required: true }, 
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  codigoBarras: { type: String, required: true, unique: true },
  marca: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

// Ruta para crear un nuevo producto con imagen
router.post('/crear', upload.single('imagen'), async (req, res) => {
  const { nombre, precio, descripcion, codigoBarras, marca } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!nombre || !precio || !descripcion || !codigoBarras || !marca || !req.file) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Crea un nuevo producto con la ruta de la imagen
    const newProduct = new Product({
      nombre,
      imagen: req.file.path ? req.file.filename : '',// Ruta de la imagen subida
      precio,
      descripcion,
      codigoBarras,
      marca,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por código de barras
router.get('/buscar', async (req, res) => {
    const { codigoBarras } = req.query; // Obtiene el código de barras del parámetro de consulta

    try {
        const producto = await Product.findOne({ codigoBarras });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto); // Retorna el producto encontrado
    } catch (error) {
        console.error('Error al buscar el producto:', error);
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un producto
    router.put('/codigoBarras/:codigoBarras', async (req, res) => {
    const { nombre, precio, descripcion, } = req.body; // Obtener datos del cuerpo de la solicitud
  
    try {
      const user = await Product.findOneAndUpdate(
        { codigoBarras: req.params.codigoBarras }, // Busca el producto por cédula
        { nombre, precio, descripcion }, // Nuevos datos
        { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
      );
  
      if (!user) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(user); // Retorna el usuario actualizado
    } catch (error) {
      console.error('Error al actualizar el Producto:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Eliminar un producto
router.delete('/eliminar/:codigoBarras', async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({ codigoBarras: req.params.codigoBarras }); // Busca y elimina el usuario por cédula
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el Producto:', error);
      res.status(500).json({ error: error.message });
    }
  });

export default router;
