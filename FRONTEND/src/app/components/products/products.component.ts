import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        this.productos = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }

  anadirAlCarrito(producto: any): void {
    console.log('Producto añadido al carrito:', producto);
    // Lógica para añadir el producto al carrito
  }

  comprar(producto: any): void {
    console.log('Producto comprado:', producto);
    // Lógica para comprar el producto
  }
}
