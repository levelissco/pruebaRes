import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Correo } from 'src/app/models/correo';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  sendEmail(correo: Correo){
    return this.http.post(`${this.API_URI}/email`, correo);
  }
}
