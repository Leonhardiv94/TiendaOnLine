import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registroForm: FormGroup;
  tipoUsuario: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ["general"]
    });
  }

  isAdmin(): boolean {
    return this.tipoUsuario === 'admin'; // Cambia 'Administrador' por el valor que uses para admin
  }

  async onSubmit() {
    console.log('Formulario enviado'); // Para verificar que se llama
    if (this.registroForm.valid) {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', this.registroForm.value);
            console.log(response.data.message);
            this.router.navigate(['/successful-registration']); // Redirige a la página de éxito
        } catch (error) {
            console.error('Error al registrar:', error);
            // Opcional: muestra un mensaje de error en la interfaz
        }
    } else {
        console.log('Formulario no válido'); // Para verificar si el formulario es válido
    }
  }
}
