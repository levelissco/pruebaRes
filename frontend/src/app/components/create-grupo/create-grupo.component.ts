import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/materia/materia.service';
import { Grupo } from 'src/app/models/grupo';
import { GruposService } from 'src/app/services/grupo/grupos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Materia } from 'src/app/models/materia';

import {FormControl, Validators} from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-grupo',
  templateUrl: './create-grupo.component.html',
  styleUrls: ['./create-grupo.component.css']
})
export class CreateGrupoComponent implements OnInit {
  horaInicio: string;
  horaFinal: string;
  inicioControl = new FormControl('', [Validators.required]);
  finalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  hora_inicio: string[] = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
                          '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  hora_final: string[] = [];
  materias: any = [];
  materia: Materia = {
    clave_materia: '',
    nombre_materia: '',
    unidades: 0
  };
  grupo: Grupo = {
    clave_materia: '',
    clave_grupo: '',
    clave_profesor: '',
    hora_inicio: this.horaInicio,
    hora_final: this.horaFinal
  }
  clave_profesor: any;
  constructor(private materiaService: MateriaService,
    private gruposService: GruposService,
    private _snackBar: MatSnackBar,
    private storage: StorageMap, private router: Router,) {
      this.storage.get('clave_profesor').subscribe((profesor) => {
        this.clave_profesor = profesor;
        this.grupo.clave_profesor=this.clave_profesor;
      });
    }

  ngOnInit() {
    this.materiaService.getMaterias().subscribe(
      res => {
        this.materias = res;
      },
      err => console.log(err)
    );
  }
  saveGrupo() {
    this.grupo.hora_inicio=this.horaInicio;
    this.grupo.hora_final=this.horaFinal;
    this.gruposService.saveGrupo(this.grupo).subscribe(
      res => {
        this.openSnackBar('Se creo nuevo grupo');
        this.resetForm(); 
      },
      err => console.log(err)
    );
  }
  setValue() {
    if (this.grupo.clave_materia != '') {
      this.materiaService.getMateria(this.grupo.clave_materia).subscribe(
        res => {
          if (res[0] != undefined) {
            this.materia = res[0];
          } else {
            this.resetMateria();
            this.openSnackBar('Clave de materia incorrecta');
          }
        },
        err => {
          console.log(err)
        }
      );
    } else {
      this.resetMateria();
      this.openSnackBar('Escribe una clave de materia');
    }
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  setHorario(){
    this.horaInicio=this.hora_inicio[0];
    this.setFinal();
  }
  setFinal(){
    let pos = this.hora_inicio.indexOf(this.horaInicio)+1;
    this.hora_final.splice(0, this.hora_inicio.length);
    if (pos == 13) {
      this.horaFinal='20:00';
      this.hora_final.push('20:00');
    }else{
      let cont =0;
      this.horaFinal=this.hora_inicio[pos];
      for (let index = pos; index < this.hora_inicio.length; index++) {
        this.hora_final[cont]=this.hora_inicio[index];
        cont++;
        if (index == 12) {
          this.hora_final[cont]='20:00';
        }
      }
    }
  }
  resetForm(){
    this.grupo.clave_materia='';
    this.grupo.clave_grupo='';
    this.materia.clave_materia='';
    this.materia.nombre_materia='';
    this.materia.unidades=0;
    this.horaInicio='';
    this.horaFinal='';
  }
  resetMateria(){
    this.materia.clave_materia = '';
    this.materia.nombre_materia = '';
    this.materia.unidades = 0;
  }
  logOut(){
    this.storage.delete('clave_profesor').subscribe(() => { 
      this.router.navigate(['/'])
    });
  }
}
