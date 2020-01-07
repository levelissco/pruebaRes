import { Component, OnInit } from '@angular/core';
import { GruposService } from '../../services/grupo/grupos.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialog } from '@angular/material/dialog';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-grupos',
  templateUrl: './get-grupos.component.html',
  styleUrls: ['./get-grupos.component.css']
})
export class GetGruposComponent implements OnInit {
  grupos: any = [];
  materias: any = [];
  clave_profesor: any;
  clave_grupo: string;
  clave_materia: string;
  id_grupo:number;
  constructor(private gruposService: GruposService, 
    private storage: StorageMap, private router: Router,
    public dialog: MatDialog) {
  }

  openDialog(boton): void {
    this.id_grupo = boton.id;
    this.clave_materia = boton.name;
    this.storage.set('clave_materia', this.clave_materia).subscribe(() => { });
    this.storage.set('id_grupo', this.id_grupo).subscribe(() => {});
    const dialogRef = this.dialog.open(EditGrupoComponent, {
      height: '600px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.storage.delete('id_grupo').subscribe(() => { });
      this.storage.delete('clave_materia').subscribe(() => { });
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.gruposService.getMaterias(this.clave_profesor).subscribe(
        res => {
          this.grupos = res;
          this.eliminarDuplicados();
        },
        err => console.log(err)
      );
    });
    
  }
  eliminarDuplicados() {
    this.grupos.forEach(grupo => {
      if (!this.existe(grupo.clave_materia)) {
        this.materias.push(grupo);
      }
    });
  }
  existe(clave_materia: string) {
    for (let index = 0; index < this.materias.length; index++) {
      if (clave_materia == this.materias[index].clave_materia) {
        return true;
      }
    }
    return false;
  }
  logOut(){
    this.storage.delete('clave_profesor').subscribe(() => { 
      this.router.navigate(['/'])
    });
  }
}
