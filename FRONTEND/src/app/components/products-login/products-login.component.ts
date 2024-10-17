import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-login',
  standalone: true, // Añade esta línea si estás usando componentes standalone
  imports: [CommonModule], // Importamos CommonModule para que estén disponibles los pipes
  templateUrl: './products-login.component.html',
  styleUrls: ['./products-login.component.css']
})
export class ProductsLoginComponent implements OnInit {
  productos: any[] = []; // Arreglo para almacenar los productos
  nombre: string = '';
  apellido: string= '';
  tipoUsuario: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProductos(); // Llamamos al método para obtener los productos
    // Aquí es donde obtienes el nombre y tipo de usuario del localStorage
    this.nombre = localStorage.getItem('nombre') || 'Usuario'; // Obtenemos el nombre
    this.apellido = localStorage.getItem('apellido') || 'apellido';
    this.tipoUsuario = localStorage.getItem('tipoUsuario') || 'Desconocido'; // Obtenemos el tipo de usuario
  }

  obtenerProductos(): void {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:5000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (response) => {
        this.productos = response;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  anadirAlCarrito(producto: any): void {
    // Lógica para añadir el producto al carrito
  }

  comprar(producto: any): void {
    // Lógica para comprar el producto
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
