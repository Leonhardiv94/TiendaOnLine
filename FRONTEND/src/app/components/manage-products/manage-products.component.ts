import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  searchField: string = ''; // Campo de búsqueda
  productoEncontrado: any = null; // Producto encontrado
  producto: any = null;
  error: string = '';
  modificarFormVisible: boolean = false; // Control de visibilidad del formulario de modificación
  crearFormVisible: boolean = false; // Control de visibilidad del formulario de creación
  nuevoProducto: any = { // Objeto para almacenar los datos del nuevo producto
    nombre: '',
    imagen: '',
    precio: 0,
    descripcion: '',
    codigoBarras: ''
  };
  
  selectedFile: File | null = null; // Archivo seleccionado

  constructor(private http: HttpClient) {}

  // Método para manejar el archivo seleccionado
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement; // Obtener el elemento de entrada
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Asignar el archivo seleccionado
    }
  }

  // Método para mostrar el formulario de creación de producto
  mostrarFormularioCrear() {
    this.crearFormVisible = true; // Mostrar el formulario de creación
    this.resetForm(); // Reiniciar el formulario para asegurarte de que no tenga datos previos
  }

  mostrarFormularioModificar() {
    if (!this.productoEncontrado) {
      alert('Por favor, busca un producto antes de modificarlo.');
      return; // Detener el proceso si no hay producto encontrado
    }
    
    this.modificarFormVisible = true; // Mostrar el formulario de modificación
    this.crearFormVisible = false; // Asegúrate de que el formulario de creación esté oculto
  }  

  crearProducto() {
    console.log('Crear producto:', this.nuevoProducto);

    if (!this.selectedFile) {
      alert('Por favor, selecciona un archivo de imagen.');
      return; // Detener el proceso si no hay archivo
    }

    const formData: FormData = new FormData(); // Crear un FormData
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('imagen', this.selectedFile); // Agregar el archivo de imagen
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('codigoBarras', this.nuevoProducto.codigoBarras);

    // Enviar el FormData al servidor
    this.http.post('http://localhost:5000/api/products/crear', formData)
      .subscribe({
        next: (response: any) => {
          console.log('Producto creado:', response);
          alert('Producto creado exitosamente.');
          this.crearFormVisible = false; // Ocultar el formulario después de crear
          this.resetForm(); // Reiniciar el formulario
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          alert('Error al crear el producto.');
        }
      });
  }

  // Método para buscar un producto
  buscarProducto() {
    const url = `http://localhost:5000/api/products/buscar?codigoBarras=${this.searchField}`;

    axios.get(url)
      .then(response => {
        console.log('Respuesta completa de la API:', response);
        this.productoEncontrado = response.data; // Guardar el producto encontrado
        console.log('Producto encontrado:', this.productoEncontrado);
      })
      .catch(error => {
        console.error('Error al buscar el producto:', error);
        this.error = 'Producto no encontrado o error en la búsqueda'; // Mostrar un error al usuario
      });
  }

  // Método para reiniciar el formulario
  resetForm() {
    this.nuevoProducto = { nombre: '', imagen: '', precio: 0, descripcion: '', codigoBarras: '' };
    this.selectedFile = null; // Reiniciar el archivo seleccionado
  }

  eliminarProducto() {
    console.log('Eliminar producto:', this.productoEncontrado);
    
  // Realiza la solicitud al backend para eliminar el usuario
  this.http.delete(`http://localhost:5000/api/products/eliminar/${this.productoEncontrado.codigoBarras}`)
    .subscribe({
      next: (response) => {
        console.log('Producto eliminado:', response);
        alert('Producto eliminado exitosamente');
        // Opcional: puedes reiniciar el campo de búsqueda y la información del usuario encontrado
        this.productoEncontrado = null;
        this.searchField = '';
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto');
      }
    });
  }
  
  modificarProducto() {
    console.log('Modificar producto:', this.productoEncontrado);
    this.http.put(`http://localhost:5000/api/products/codigoBarras/${this.productoEncontrado.codigoBarras}`, {
      nombre: this.productoEncontrado.nombre,
      precio: this.productoEncontrado.precio,
      descripcion: this.productoEncontrado.descripcion,
    }).subscribe({
      next: (response: any) => {
        console.log('Producto modificado:', response);
        alert('Información del producto modificada con éxito.');
        this.modificarFormVisible = false; // Oculta el formulario después de modificar
      },
      error: (error) => {
        console.error('Error al modificar el Producto:', error);
        alert('Error al modificar la información del Producto.');
      }
    });
  }
  
  cancelarModificacion() {
    this.modificarFormVisible = false; // Ocultar el formulario de modificación
    this.productoEncontrado = null; // Reiniciar el producto encontrado
  }
  
  cancelarCreacion() {
    this.crearFormVisible = false; // Ocultar el formulario de creación
    this.resetForm(); // Reiniciar el formulario para asegurarte de que no tenga datos previos
  }
  
}
