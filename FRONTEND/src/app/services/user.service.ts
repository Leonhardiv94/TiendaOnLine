import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users/current-user';

  getUsuarioActual(): Promise<any> {
    return axios.get(`${this.apiUrl}/current-user`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener el usuario actual:', error);
        throw error;
      });
  }
}
