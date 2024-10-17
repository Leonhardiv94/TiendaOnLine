import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  searchField: string = ''; // Campo de búsqueda para cédula o correo
  usuarioEncontrado: any = null; // Variable para almacenar los datos del usuario buscado
  modificarFormVisible: boolean = false; // Controla la visibilidad del formulario de modificación
  crearFormVisible: boolean = false; // Controla la visibilidad del formulario de creación
  nuevoUsuario: any = { // Objeto para almacenar los datos del nuevo usuario
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: '',
    email: '',
    contrasena: '',
    tipoUsuario: 'General' // Valor por defecto
  };

  constructor(private http: HttpClient) {}

  // Método que simula la búsqueda de usuarios
  buscarUsuario() {
    console.log('Buscar usuario por:', this.searchField);

    // Realiza la solicitud al backend para buscar el usuario
    this.http.get(`http://localhost:5000/api/users/cedula/${this.searchField}`)
      .subscribe({
        next: (response: any) => {
          this.usuarioEncontrado = response; // Asigna los datos del usuario encontrado
        },
        error: (error) => {
          console.error('Error al buscar el usuario:', error);
          this.usuarioEncontrado = null; // Reiniciar userData en caso de error
          alert('Usiario no existe');
        }
      });
  }

  mostrarFormularioCrear() {
    this.crearFormVisible = true; // Muestra el formulario de creación
    this.modificarFormVisible = false; // Asegúrate de ocultar el formulario de modificación
    this.nuevoUsuario = { // Reinicia el objeto nuevoUsuario
      nombre: '',
      apellido: '',
      cedula: '',
      fechaNacimiento: '',
      email: '',
      contrasena: '',
      tipoUsuario: 'general'
    };
  }

  mostrarFormularioModificar() {
    this.modificarFormVisible = true; // Muestra el formulario de modificación
  }

  cancelarModificacion() {
    this.modificarFormVisible = false; // Oculta el formulario de modificación
  }

  cancelarCreacion() {
    this.crearFormVisible = false; // Oculta el formulario de creación
  }

  // Método para modificar la información del usuario
  modificarUsuario() {
    console.log('Modificar usuario:', this.usuarioEncontrado);
    this.http.put(`http://localhost:5000/api/users/cedula/${this.usuarioEncontrado.cedula}`, {
      nombre: this.usuarioEncontrado.nombre,
      apellido: this.usuarioEncontrado.apellido,
      email: this.usuarioEncontrado.email,
    }).subscribe({
      next: (response: any) => {
        console.log('Usuario modificado:', response);
        alert('Información del usuario modificada con éxito.');
        this.modificarFormVisible = false; // Oculta el formulario después de modificar
      },
      error: (error) => {
        console.error('Error al modificar el usuario:', error);
        alert('Error al modificar la información del usuario.');
      }
    });
  }

  crearUsuario() {
    console.log('Crear usuario:', this.nuevoUsuario);
    this.http.post('http://localhost:5000/api/users/register', this.nuevoUsuario)
      .subscribe({
        next: (response: any) => {
          console.log('Usuario creado:', response);
          alert('Usuario creado exitosamente.');
          this.crearFormVisible = false; // Oculta el formulario de creación después de crear
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
          alert('Error al crear el usuario.');
        }
      });
  }

  // Método para eliminar al usuario
  eliminarUsuario() {
    console.log('Eliminar usuario:', this.usuarioEncontrado);
    
    // Realiza la solicitud al backend para eliminar el usuario
    this.http.delete(`http://localhost:5000/api/users/cedula/${this.usuarioEncontrado.cedula}`)
      .subscribe({
        next: (response) => {
          console.log('Usuario eliminado:', response);
          alert('Usuario eliminado exitosamente');
          // Opcional: puedes reiniciar el campo de búsqueda y la información del usuario encontrado
          this.usuarioEncontrado = null;
          this.searchField = '';
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario');
        }
      });
  }
}
