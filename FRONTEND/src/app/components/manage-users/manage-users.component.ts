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

  constructor(private http: HttpClient) {}

  // Método que simula la búsqueda de usuarios
  buscarUsuario() {
    // Aquí puedes realizar la petición para buscar al usuario en tu base de datos por cédula o correo
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

  mostrarFormularioModificar() {
    this.modificarFormVisible = true; // Muestra el formulario de modificación
  }

  cancelarModificacion() {
    this.modificarFormVisible = false; // Oculta el formulario de modificación
  }

  // Método para modificar la información del usuario
  modificarUsuario() {
    console.log('Modificar usuario:', this.usuarioEncontrado);
    this.http.put(`http://localhost:5000/api/users/cedula/${this.usuarioEncontrado.cedula}`, {
      nombre: this.usuarioEncontrado.nombre,
      apellido: this.usuarioEncontrado.apellido,
      email: this.usuarioEncontrado.email,
      // Puedes agregar otros campos si es necesario
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
