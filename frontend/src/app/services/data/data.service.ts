import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  listar$ = new EventEmitter<any[]>();
  unidad$ = new EventEmitter<number>();
  criterios$ = new EventEmitter<any[]>();
  constructor() { }
}
