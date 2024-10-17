import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Necesario para las peticiones HTTP
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  tipoUsuario: string = '';
  detallesUsuario: any = null; // Para almacenar los detalles del usuario que podrías obtener del backend

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Obtenemos los datos del usuario almacenados en localStorage
    this.nombre = localStorage.getItem('nombre') || 'Usuario';
    this.apellido = localStorage.getItem('apellido') || 'Apellido';
    this.tipoUsuario = localStorage.getItem('tipoUsuario') || 'Desconocido';

    // Si necesitas obtener más datos desde el backend
    this.obtenerDetallesUsuario();
  }

  obtenerDetallesUsuario(): void {
    const token = localStorage.getItem('token'); // Obtenemos el token desde el localStorage

    // Realizamos una petición HTTP al servidor para obtener los detalles del usuario
    this.http.get<any>('http://localhost:5000/api/user-details', {
      headers: {
        'Authorization': `Bearer ${token}` // Enviamos el token en los headers
      }
    }).subscribe({
      next: (response) => {
        this.detallesUsuario = response;
      },
      error: (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    });
  }

  navigateToUsers() {
    this.router.navigate(['/manage-users']);
  }

  navigateToProducts() {
    this.router.navigate(['/manage-products']);
  }

  isAdmin(): boolean {
    return this.tipoUsuario === 'admin'; // Cambia 'Administrador' por el valor que uses para admin
  }

  cerrarSesion(): void {
    // Eliminar el token y los datos del usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('tipoUsuario');

    // Redirigir al usuario a la página de inicio o de login
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
