import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Verifica si hay un token
    if (token) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/home']); // Redirige a login si no hay token
      return false; // Bloquea el acceso
    }
  }

  cerrarSesion(): void {
    // Elimina el token y los datos del usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('tipoUsuario');
    
    // Redirige a la página de login o home
    this.router.navigate(['/home']); // Cambia '/login' por la ruta a la que quieras redirigir
  }
}
