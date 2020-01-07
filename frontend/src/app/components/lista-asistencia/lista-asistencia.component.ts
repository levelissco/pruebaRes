import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { DataService } from 'src/app/services/data/data.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.component.html',
  styleUrls: ['./lista-asistencia.component.css']
})
export class ListaAsistenciaComponent implements OnInit {
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: any;
  selection: any;
  id_grupo: any;
  clave_profesor: any;
  alumnos: any = [];
  unidad: number = 1;

  columnas: any[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private storage: StorageMap,
    private asistenciaService: AsistenciaService,
    private dataService: DataService) { }

  ngOnInit() {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getAlumnos();
    });
    this.dataService.listar$.subscribe(() => {
      this.getAlumnos();
    });
    this.dataService.unidad$.subscribe(unidad => {
      this.unidad = unidad;
      this.getAlumnos();
    })
  }

  getAlumnos() {
    this.asistenciaService.getListaByGrupoByUnidad(this.id_grupo, this.unidad).subscribe(
      res => {
        this.alumnos = res;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.dataSource.sort = this.sort;
        this.fechasDiferentes();
        this.recorrer();
        console.log(this.displayedColumns);
        console.log(this.columnas);
        console.log(this.dataSource);
        this.selection = new SelectionModel(true, []);
      },
      err => {
        console.log(err);
      }
    );
  }
  fechasDiferentes() {
    this.alumnos.forEach(element => {
      if (!this.displayedColumns.includes(element.fecha)) {
        this.displayedColumns.push(element.fecha);
      }
    });
  }

  recorrer() {
    let control = { title: 'Nº Control', name: 'num_control' };
    let nombre = { title: 'Nombre', name: 'nombre_est' };
    this.columnas.push(control);
    this.columnas.push(nombre);
    for (let index = 0; index < this.displayedColumns.length; index++) {
      let obj = { title: this.displayedColumns[index], name: 'asistencia' };
      this.columnas.push(obj);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
