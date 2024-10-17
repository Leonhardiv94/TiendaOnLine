import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importamos ReactiveFormsModule para usar formularios reactivos
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Definimos el FormGroup
  loginMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Inicializamos el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validación para el correo
      contrasena: ['', [Validators.required, Validators.minLength(6)]] // Validación para la contraseña
    });
  }

  // Método que se llama al enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value; // Obtenemos los valores del formulario

      // Realizamos la petición HTTP
      this.http.post('http://localhost:5000/api/users/login', userData).subscribe({
        next: (response: any) => {
          const token = response.token;

          // Guardamos el token en localStorage
          localStorage.setItem('token', token);

          // Verificamos el tipo de usuario en la respuesta y lo guardamos
          const nombre = response.nombre;
          const apellido = response.apellido;
          const tipoUsuario = response.tipoUsuario;

          // Guardamos nombre y tipoUsuario en localStorage
          localStorage.setItem('nombre', nombre);
          localStorage.setItem('apellido', apellido);
          localStorage.setItem('tipoUsuario', tipoUsuario);

          // Redirigimos según el tipo de usuario
          if (tipoUsuario === 'admin') {
            this.router.navigate(['/admin']); // Página para administradores
          } else if (tipoUsuario === 'general') {
            this.router.navigate(['/products-login']); // Página para usuarios generales
          }

          // Mensaje de éxito
          this.loginMessage = 'Ingreso exitoso';
        },
            error: (error) => {
            console.error('Error en el login:', error);
            this.loginMessage = 'Credenciales incorrectas. Intenta de nuevo.';
          }
      });
    } else {
      this.loginMessage = 'Por favor completa los campos correctamente.';
    }
  }
}
