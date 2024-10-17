import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-on',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './home-on.component.html',
  styleUrls: ['./home-on.component.css']
})
export class HomeOnComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  tipoUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Obtenemos el nombre, apellido y tipo de usuario desde el localStorage
    this.nombre = localStorage.getItem('nombre') || 'Usuario';
    this.apellido = localStorage.getItem('apellido') || 'Apellido';
    this.tipoUsuario = localStorage.getItem('tipoUsuario') || 'Desconocido';
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
