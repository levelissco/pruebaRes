import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Estudiante } from 'src/app/models/estudiante';
import { AES } from 'crypto-js';
import { ViewListaComponent } from '../view-lista/view-lista.component';
import * as XLSX from 'xlsx';
import { Detalle_grupo } from 'src/app/models/detalle-grupo';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-add-estudiantes',
  templateUrl: './add-estudiantes.component.html',
  styleUrls: ['./add-estudiantes.component.css']
})
export class AddEstudiantesComponent implements OnInit {
  clave_profesor: any;
  id_grupo: any;
  newEstudiantes: any = [];
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
    private storage: StorageMap, public dialog: MatDialog,
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
  onChange(event) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (ev) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      jsonData['Hoja1'].forEach(element => {
        this.estudiante = element;
        this.newEstudiantes.push(this.estudiante);
      });
    }
    reader.readAsBinaryString(file);
  }
  saveEstudiantes() {
    let cont = 1;
    this.newEstudiantes.forEach(element => {
      this.estudianteService.findEstudiante(element.num_control).subscribe(
        res => {
          if (res[0] != undefined) {
            this.addEstudiante(element.num_control);
          } else {
            this.newEstudiante(element);
            this.addEstudiante(element.num_control);
          }
          if (cont == this.newEstudiantes.length) {
            this.openSnackBar(`Se garegaron ${cont} estudiantes al grupo`);
          }
          cont++;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  viewEstudiantes() {
    const dialogRef = this.dialog.open(ViewListaComponent, {
      height: '400px',
      width: '600px',
      data: this.newEstudiantes
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  addEstudiante(num_control: number) {
    this.clase.num_control = num_control;
    this.detalleGrupoService.addEstudiante(this.clase).subscribe(
      res => {
        this.dataService.listar$.emit();
      },
      err => console.log(err)
    );
  }
  newEstudiante(estudiante: Estudiante) {
    let cifrado = AES.encrypt('' + estudiante.num_control, 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=');
    estudiante.password = cifrado.toString();
    this.estudianteService.saveEstudiante(estudiante).subscribe(
      res => {
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
}
