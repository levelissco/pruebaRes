import { Component, OnInit, HostBinding } from '@angular/core';
import { LoginProfesorComponent } from '../login-profesor/login-profesor.component';
import { MatDialog } from '@angular/material';
import { LoginEstudianteComponent } from '../login-estudiante/login-estudiante.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialogProfe(): void {
    const dialogRef = this.dialog.open(LoginProfesorComponent, {
      height: '340px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    //console.log(boton);
  }
  openDialogEst(): void {
    const dialogRef = this.dialog.open(LoginEstudianteComponent, {
      height: '340px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    console.log();
  }
}
