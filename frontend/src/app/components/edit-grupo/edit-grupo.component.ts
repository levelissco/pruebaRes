import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Clase } from '../../models/clase';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { Estudiante } from 'src/app/models/estudiante';
import { Criterio } from 'src/app/models/criterio';


@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css']
})
export class EditGrupoComponent implements OnInit {
  clave_profesor: any;
  clave_materia: any;
  clave_grupo: any;
  alumnos: any = [];
  unidad: number = 1;
  unidades: any = [1, 2, 3, 4, 5, 6, 7];
  criterio: string = '';
  porcentaje: number = 0;
  criterios: Criterio[] = [
    {
      unidad: 1,
      nombre: 'Examen',
      porcentaje: 0.20
    }, {
      unidad: 1,
      nombre: 'Tareas',
      porcentaje: 0.30
    }, {
      unidad: 2,
      nombre: 'Practicas',
      porcentaje: 0.40
    }
  ];
  displayedColumnsPorcentaje = ['nombre', 'porcentaje'];

  displayedColumns: string[] = ['num_control', 'nombre_estudiante'];
  dataSource: any;
  dataSourceCriterios: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  estudiante: Estudiante = {
    num_control: 0,
    nombre_estudiante: ''
  }
  clase: Clase = {
    clave_materia: '',
    clave_grupo: '',
    num_control: 0
  }
  constructor(
    public dialogRef: MatDialogRef<EditGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Clase,
    private storage: StorageMap, private claseService: ClaseService,
    private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar) {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('clave_materia').subscribe((materia) => {
      this.clave_materia = materia;
    });
    this.storage.get('clave_grupo').subscribe((grupo) => {
      this.clave_grupo = grupo;
      this.getAlumnos();
    });
  }

  ngOnInit() {
    this.dataSourceCriterios = new MatTableDataSource(this.criterios);
  }

  async validateEstudiante() {
    if (this.isNumber(this.estudiante.num_control)) {
      this.clase.clave_materia = this.clave_materia;
      this.clase.clave_grupo = this.clave_grupo;
      this.clase.num_control = this.estudiante.num_control;
      this.findStudent(this.clase.num_control);
    } else {
      this.openSnackBar('Numero de control invalido');
    }
  }
  getAlumnos() {
    this.claseService.getAlumnos(this.clave_profesor, this.clave_materia, this.clave_grupo).subscribe(
      res => {
        this.alumnos = res;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    );
  }
  findStudent(num_control: number) {
    this.claseService.findEstudiante(this.clave_profesor, num_control).subscribe(
      res => {
        if (res[0] != undefined) {
          this.estudiante = res[0];
        } else {
          this.estudiante.nombre_estudiante = '';
        }
      },
      err => console.log(err)
    );
  }
  saveEstudiante() {
    this.clase.clave_materia = this.clave_materia;
    this.clase.clave_grupo = this.clave_grupo;
    this.estudianteService.findEstudiante(this.estudiante.num_control).subscribe(
      res => {
        if (res[0] != undefined) {
          this.addEstudiante();
          this.resetForm();
        } else {
          this.newEstudiante();
          this.addEstudiante();
          this.resetForm();
        }
      },
      err => console.log(err)
    );
  }
  addEstudiante() {
    this.claseService.saveClase(this.clase).subscribe(
      res => {
        this.getAlumnos();
        console.log(res);
        this.openSnackBar('Nuevo estudiante agregado a la clase');
      },
      err => console.log(err)
    );
  }
  newEstudiante() {
    this.estudianteService.saveEstudiante(this.estudiante).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  saveCriterio() {
    this.dataSourceCriterios = new MatTableDataSource(this.criterios);
    console.log(this.criterio, this.porcentaje);
    this.criterios.push({ nombre: this.criterio, porcentaje: this.porcentaje/100});
    console.log(this.criterios);
  }
  onNoClick(): void {
    this.storage.delete('clave_materia').subscribe(() => { });
    this.storage.delete('clave_grupo').subscribe(() => { });
    this.dialogRef.close();
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  resetForm() {
    this.estudiante.nombre_estudiante = '';
    this.estudiante.num_control = 0;
  }
  isNumber(control) {
    if (!isNaN(control)) {
      return true;
    }
    return false;
  }
  getTotalPorcentaje() {
    return this.criterios.map(t => t.porcentaje).reduce((acc, value) => acc + value, 0);
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}