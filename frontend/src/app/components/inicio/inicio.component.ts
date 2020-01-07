import { Component, OnInit, HostBinding } from '@angular/core';
import { LoginProfesorComponent } from '../login-profesor/login-profesor.component';
import { MatDialog } from '@angular/material';
import { LoginEstudianteComponent } from '../login-estudiante/login-estudiante.component';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  constructor(public dialog: MatDialog,
    private storage: StorageMap) { }

  ngOnInit() {
    this.storage.clear().subscribe(() => {});
  }
  openDialogProfe(): void {
    const dialogRef = this.dialog.open(LoginProfesorComponent, {
      height: '420px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogEst(): void {
    const dialogRef = this.dialog.open(LoginEstudianteComponent, {
      height: '380px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    console.log();
  }
}
