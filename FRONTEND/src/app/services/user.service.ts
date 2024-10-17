import axios from 'axios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Injectable({
  providedIn: 'root'
})
export class AuthService { // Cambia el nombre a AuthService si es necesario
  private apiUrl = 'http://localhost:5000/api/users/current-user';

  constructor(private router: Router) {} // Agrega Router al constructor

  getUsuarioActual(): Promise<any> {
    return axios.get(`${this.apiUrl}/current-user`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener el usuario actual:', error);
        throw error;
      });
  }

  cerrarSesion(): void {
    // Elimina el token y la información del usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('tipoUsuario');

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/home']); // Cambia '/login' a la ruta de tu página de inicio de sesión
  }
}
