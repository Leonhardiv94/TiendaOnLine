import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tipoUsuario: string = '';


  isAdmin(): boolean {
    return this.tipoUsuario === 'admin'; // Cambia 'Administrador' por el valor que uses para admin
  }


  constructor(private http: HttpClient, private router: Router) {}

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
