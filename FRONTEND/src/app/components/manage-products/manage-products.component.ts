import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  crearProductoVisible: boolean = false; // Controla la visibilidad del formulario de creación
  nuevoProducto: any = { // Objeto para almacenar la información del nuevo producto
    nombre: '',
    imagen: null,
    precio: 0,
    descripcion: '',
    codigoBarras: ''
  };

  constructor(private http: HttpClient) {}

  // Muestra el formulario de creación de productos
  mostrarFormularioCrear() {
    this.crearProductoVisible = true;
  }

  // Oculta el formulario de creación
  cancelarCreacion() {
    this.crearProductoVisible = false;
    this.nuevoProducto = { // Reinicia el objeto del nuevo producto
      nombre: '',
      imagen: null,
      precio: 0,
      descripcion: '',
      codigoBarras: ''
    };
  }

  // Maneja la selección de la imagen
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.nuevoProducto.imagen = file; // Guarda el archivo de imagen
    }
  }

  // Envía la solicitud para crear un nuevo producto
  crearProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    if (this.nuevoProducto.imagen) {
      formData.append('imagen', this.nuevoProducto.imagen);
    }
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('codigoBarras', this.nuevoProducto.codigoBarras);

    // Realiza la solicitud al backend para crear un nuevo producto
    this.http.post('http://localhost:5000/api/products/crear', formData).subscribe({
      next: (response) => {
        console.log('Producto creado exitosamente:', response);
        alert("Producto creado exitosamente");
        this.cancelarCreacion(); // Oculta el formulario después de crear el producto
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
      }
    });
  }
}
