import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users'; // Asegúrate que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData).pipe(
      catchError((error) => {
        console.error('Error al registrar:', error);
        throw error; // Re-lanza el error para manejarlo en el componente
      })
    );
  }

  // Método para autenticar un usuario
  loginUser(credentials: { email: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        console.error('Error en el login:', error);
        throw error; // Re-lanza el error para manejarlo en el componente
      })
    );
  }
}
