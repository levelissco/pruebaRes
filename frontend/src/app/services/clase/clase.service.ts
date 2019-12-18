import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clase } from 'src/app/models/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  findEstudiante(clave_profesor: number, num_control: number){
    return this.http.get(`${this.API_URI}/clase/${clave_profesor}/${num_control}`);
  }
  getAlumnos(clave_profesor: number, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/clase/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  saveClase(clase: Clase){
    return this.http.post(`${this.API_URI}/clase`, clase);
  }
}
