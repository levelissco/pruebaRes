import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materia } from '../../models/materia';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  API_URI = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  getMaterias(){
    return this.http.get(`${this.API_URI}/materia`);
  }
  getMateria(clave_materia: string){
    return this.http.get(`${this.API_URI}/materia/${clave_materia}`);
  }
}
