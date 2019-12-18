import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from 'src/app/models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getAllEstudiantes(){
    return this.http.get(`${this.API_URI}/estudiante`);
  }
  findEstudiante(num_control:number){
    return this.http.get(`${this.API_URI}/estudiante/${num_control}`);
  }
  saveEstudiante(estudiante: Estudiante){
    return this.http.post(`${this.API_URI}/estudiante`, estudiante);
  }
}
