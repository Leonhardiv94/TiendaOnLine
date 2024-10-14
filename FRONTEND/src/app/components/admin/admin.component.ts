import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) {}

  navigateToUsers() {
    this.router.navigate(['/manage-users']); // Cambia esta ruta por la que tengas para gestionar usuarios
  }

  navigateToProducts() {
    this.router.navigate(['/manage-products']); // Cambia esta ruta por la que tengas para gestionar productos
  }
}
