import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-successful-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.css']
})
export class SuccessfulRegistrationComponent {
  constructor(private router: Router) { } // Inyecta Router
  tipoUsuario: string = '';

  navigateToLogin() {
    this.router.navigate(['/login']); // Ajusta la ruta según tu configuración
  }

  isAdmin(): boolean {
    return this.tipoUsuario === 'admin'; // Cambia 'Administrador' por el valor que uses para admin
  }

}
