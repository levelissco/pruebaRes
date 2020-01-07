import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css']
})
export class EditGrupoComponent implements OnInit {
  unidad: number = 1;
  unidades: any = [];

  constructor(private storage: StorageMap,
    private materiaService: MateriaService,
    private dataService: DataService) {
    this.storage.get('clave_materia').subscribe((materia) => {
      this.materiaService.getMateria(''+materia).subscribe(
        res => {
          let materia = res[0];
          for (let index = 0; index < materia.unidades; index++) {
            this.unidades.push(index + 1);
          }
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  ngOnInit() {
  }
  selectUnidad(event){
    this.unidad=event.value;
    this.dataService.unidad$.emit( this.unidad );
  }
}