import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-successful-registration',
  standalone: true,
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.css']
})
export class SuccessfulRegistrationComponent {
  constructor(private router: Router) { } // Inyecta Router

  navigateToLogin() {
    this.router.navigate(['/login']); // Ajusta la ruta según tu configuración
  }
}
