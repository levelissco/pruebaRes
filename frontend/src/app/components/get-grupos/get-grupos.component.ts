import { Component, OnInit, HostBinding } from '@angular/core';
import { GruposService } from '../../services/grupo/grupos.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialog } from '@angular/material/dialog';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component'

@Component({
  selector: 'app-get-grupos',
  templateUrl: './get-grupos.component.html',
  styleUrls: ['./get-grupos.component.css']
})
export class GetGruposComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  grupos: any = [];
  materias: any = [];
  clave_profesor: any;
  clave_grupo: string;
  clave_materia: string;
  constructor(private gruposService: GruposService, 
    private storage: StorageMap, 
    public dialog: MatDialog) {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
  }

  //-----------------
  openDialog(boton): void {
    this.clave_materia = boton.id;
    this.clave_grupo = boton.name;
    this.storage.set('clave_materia', this.clave_materia).subscribe(() => { });
    this.storage.set('clave_grupo', this.clave_grupo).subscribe(() => {});
    const dialogRef = this.dialog.open(EditGrupoComponent, {
      height: '600px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.storage.delete('clave_materia').subscribe(() => { });
      this.storage.delete('clave_grupo').subscribe(() => { });
      console.log('The dialog was closed');
    });
  }
  //-----------------

  ngOnInit() {
    this.gruposService.getGrupos(this.clave_profesor).subscribe(
      res => {
        this.grupos = res;
        this.eliminarDuplicados();
      },
      err => console.log(err)
    );
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
}
