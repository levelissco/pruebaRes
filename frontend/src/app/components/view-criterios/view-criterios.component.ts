import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataService } from 'src/app/services/data/data.service';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AddActividadComponent } from '../add-actividad/add-actividad.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-view-criterios',
  templateUrl: './view-criterios.component.html',
  styleUrls: ['./view-criterios.component.css']
})

export class ViewCriteriosComponent implements OnInit {

  displayedColumns = ['nombre', 'porcentaje', 'opciones'];
  criterios: any;
  unidad: number = 1;
  constructor(private storage: StorageMap,
    private dataService: DataService,
    private criterioService: CriterioService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewCriteriosComponent>,
    private _snackBar: MatSnackBar) {
    this.loadCriterios();
  }

  ngOnInit() {
    this.criterios = [];
    this.dataService.criterios$.subscribe(() => {
      this.loadCriterios();
    });
    this.dataService.unidad$.subscribe(unidad => {
      this.unidad = unidad;
      this.loadCriterios();
    })
  }

  loadCriterios() {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      id_grupo = id_grupo;
      this.criterioService.getCriteriosByUnidad('' + id_grupo, this.unidad).subscribe(
        res => {
          this.criterios = res;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  addActividad(boton) {
    const id_criterio = boton.target.id;
    console.log('add: ', id_criterio);
    const dialogRef = this.dialog.open(AddActividadComponent, {
      height: '500px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  viewActividad(boton) {
    const id_criterio = boton.target.id;
    console.log('view: ', id_criterio);
  }
  deleteActividad(boton) {
    const id_criterio = boton.target.id;
    this.openDialog('Esta seguro que desea eliminar este criterio ?', id_criterio);
    
  }
  openDialog(mensaje: string, id_criterio: string){
    this.dialog.open(DialogConfirmComponent, { data: mensaje})
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.criterioService.deleteCriterio(id_criterio).subscribe(
            res => {
              this.loadCriterios();
            },
            err => {
              console.log(err);
            });
        }
      }
      );
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getTotalPorcentaje() {
    return this.criterios.map(t => t.porcentaje).reduce((acc, value) => acc + value, 0);
  }
}
