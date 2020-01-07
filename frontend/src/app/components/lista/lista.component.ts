import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['num_control', 'nombre_est'];
  dataSource: any;
  id_grupo: any;
  clave_profesor: any;
  alumnos: any = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private dataService: DataService) {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
  }

  ngOnInit() {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getAlumnos();
    });
    this.dataService.listar$.subscribe( lista =>{
      this.getAlumnos();
    });
  }
  getAlumnos() {
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    );
  }

}
