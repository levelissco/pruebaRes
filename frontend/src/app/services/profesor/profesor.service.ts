import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from 'src/app/models/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  
  API_URI = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }
  getProfesores(){
    return this.http.get(`${this.API_URI}/profesor`);
  }
  findProfesor(clave_profesor: string){
    return this.http.get(`${this.API_URI}/profesor/${clave_profesor}`);
  }
  saveProfesor(profesor: Profesor){
    return this.http.post(`${this.API_URI}/profesor`, profesor);
  }
}
