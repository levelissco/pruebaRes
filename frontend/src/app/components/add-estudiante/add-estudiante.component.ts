import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Detalle_grupo } from 'src/app/models/detalle-grupo';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { MatSnackBar } from '@angular/material';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { AES } from 'crypto-js';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.css']
})
export class AddEstudianteComponent implements OnInit {
  clave_profesor: any;
  id_grupo: any;
  estudiante: Estudiante = {
    num_control: 0,
    nombre: ''
  }
  clase: Detalle_grupo = {
    id_grupo: 0,
    num_control: 0
  }
  constructor(private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar,
    private detalleGrupoService: DetalleGrupoService,
    private storage: StorageMap,
    private dataService: DataService) {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.clase.id_grupo = this.id_grupo;
    });
  }

  ngOnInit() {
  }
  validateEstudiante() {
    if (this.isNumber(this.estudiante.num_control)) {
      this.clase.num_control = this.estudiante.num_control;
      this.findStudent(this.estudiante.num_control);
    } else {
      this.openSnackBar('Numero de control invalido');
    }
  }
  findStudent(num_control: number) {
    this.detalleGrupoService.findEstudiante(this.clave_profesor, num_control).subscribe(
      res => {
        if (res[0] != undefined) {
          this.estudiante.num_control = res[0].num_control;
          this.estudiante.nombre = res[0].nombre_est;
        } else {
          this.estudiante.nombre = '';
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  saveEstudiante() {
    this.estudianteService.findEstudiante(this.estudiante.num_control).subscribe(
      res => {
        if (res[0] != undefined) {
          this.addEstudiante(this.estudiante.num_control);
          this.resetForm();
        } else {
          this.newEstudiante(this.estudiante);
          this.addEstudiante(this.estudiante.num_control);
          this.resetForm();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  addEstudiante(num_control: number) {
    this.clase.num_control = num_control;
    this.detalleGrupoService.addEstudiante(this.clase).subscribe(
      res => {
        this.dataService.listar$.emit();
        this.resetForm();
        this.openSnackBar('Se agrego nuevo estudiante a clase');
      },
      err => console.log(err)
    );
  }
  newEstudiante(estudiante: Estudiante) {
    let cifrado = AES.encrypt('' + estudiante.num_control, 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=');
    estudiante.password = cifrado.toString();
    this.estudianteService.saveEstudiante(estudiante).subscribe(
      res => {
        this.resetForm();
      },
      err => console.log(err)
    );
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  resetForm() {
    this.estudiante.nombre = '';
    this.estudiante.num_control = 0;
  }
  isNumber(control: number) {
    if (!isNaN(control)) {
      return true;
    }
    return false;
  }
}
