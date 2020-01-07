import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Criterio } from 'src/app/models/criterio';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getListaByGrupoByUnidad(id_grupo:string, num_unidad: number){
    return this.http.get(`${this.API_URI}/lista/${id_grupo}/${num_unidad}`);
  }
  
}
