import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../../models/grupo'; 
import { StorageMap } from '@ngx-pwa/local-storage';
@Injectable({
  providedIn: 'root'
})
export class GruposService {
  
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private storage: StorageMap) { 
   }

  
  getGrupos(clave_profesor: number ){
    return this.http.get(`${this.API_URI}/grupo/${clave_profesor}`);
  }
  getGruposDistintos(clave_profesor: number ){
    return this.http.get(`${this.API_URI}/grupo/${clave_profesor}`);
  }
  getGrupoMateria(clave_profesor: number, clave_materia: string ){
    return this.http.get(`${this.API_URI}/grupo/${clave_profesor}/${clave_materia}`);
  }
  saveGrupo(grupo: Grupo){
    return this.http.post(`${this.API_URI}/grupo`, grupo);
  }
  getAllEstudiantes(){
    
  }
}
