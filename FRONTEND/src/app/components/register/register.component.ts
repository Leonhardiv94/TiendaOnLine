import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    console.log('Formulario enviado'); // Para verificar que se llama
    if (this.registroForm.valid) {
        try {
            const response = await axios.post('http://localhost:5000/api/users', this.registroForm.value);
            console.log(response.data.message); // Esto debería imprimir el mensaje de éxito
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
