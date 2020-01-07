import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-view-lista',
  templateUrl: './view-lista.component.html',
  styleUrls: ['./view-lista.component.css']
})
export class ViewListaComponent implements OnInit {
  displayedColumns: string[] = ['num_control', 'nombre_est'];
  datos:any;
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialogRef: MatDialogRef<EditGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estudiante) { }

  ngOnInit() {
    this.datos = new MatTableDataSource(this.datos);
    this.datos.sort = this.sort;
    console.log(this.data);
  }

}
