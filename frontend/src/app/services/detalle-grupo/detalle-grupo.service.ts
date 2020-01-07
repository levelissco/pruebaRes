import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Detalle_grupo } from 'src/app/models/detalle-grupo';

@Injectable({
  providedIn: 'root'
})
export class DetalleGrupoService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  findGrupo(id_grupo:string){
    return this.http.get(`${this.API_URI}/detalleGrupo/${id_grupo}`);
  }
  findEstudiante(clave_profesor:string, num_control:number){
    return this.http.get(`${this.API_URI}/detalleGrupo/${clave_profesor}/${num_control}`);
  }
  getEstudiantes(clave_profesor:string, id_grupo:string, clave_materia:string){
    return this.http.get(`${this.API_URI}/detalleGrupo/${clave_profesor}/${id_grupo}/${clave_materia}`);
  }
  addEstudiante(detalleGrupo: Detalle_grupo){
    return this.http.post(`${this.API_URI}/detalleGrupo`, detalleGrupo);
  }
}
