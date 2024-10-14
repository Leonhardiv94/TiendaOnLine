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
          this.loginMessage = 'Ingreso exitoso';
          this.router.navigate(['/home']); // Redirigimos al home en caso de éxito
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
