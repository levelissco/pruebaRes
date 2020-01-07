import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Criterio } from 'src/app/models/criterio';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getCriterios(id_grupo:string){
    return this.http.get(`${this.API_URI}/criterio/${id_grupo}`);
  }
  getCriteriosByUnidad(id_grupo:string, unidad: number){
    return this.http.get(`${this.API_URI}/criterio/${id_grupo}/${unidad}`);
  }
  newCriterio(criterio: Criterio){
    return this.http.post(`${this.API_URI}/criterio`, criterio);
  }
  deleteCriterio(id_criterio: string){
    return this.http.delete(`${this.API_URI}/criterio/${id_criterio}`, );
  }
}
