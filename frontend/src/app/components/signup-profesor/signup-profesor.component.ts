import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profesor } from 'src/app/models/profesor';
import { FormControl, Validators } from '@angular/forms';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AES } from 'crypto-js';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-signup-profesor',
  templateUrl: './signup-profesor.component.html',
  styleUrls: ['./signup-profesor.component.css']
})
export class SignupProfesorComponent implements OnInit {
  hide: boolean = true;
  nombreFormControl = new FormControl('', [Validators.required]);
  apellidoFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirm_passFormControl = new FormControl('', [Validators.required]);
  profesor: Profesor = {
    clave_profesor: '',
    nombre: '',
    apellido: '',
    password: ''
  }
  confirm_password: string = '';
  constructor(private storage: StorageMap, private router: Router,
    private _snackBar: MatSnackBar,
    private profesorService: ProfesorService,
    public dialogRef: MatDialogRef<SignupProfesorComponent>) { }

  ngOnInit() {
  }

  signUp() {
    if (this.profesor.password == this.confirm_password) {
      let cifrado = AES.encrypt(this.profesor.password, 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=');
      this.profesor.clave_profesor = this.generateClave(this.profesor.nombre, this.profesor.apellido);
      this.profesor.password=cifrado.toString();
      this.profesorService.saveProfesor(this.profesor).subscribe(
        res =>{
          this.onNoClick();
          this.openSnackBar('Registro exitoso');
          this.storage.set('clave_profesor', this.profesor.clave_profesor).subscribe( () => {});
          this.router.navigate(['/dashboard']);
        },
        err =>{
          console.log( err );
        }
      );
    }else{
      this.openSnackBar('Las contraseñas deben coincidir');
    }
  }

  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  generateClave(nombre: string, apellido: string) {
    let clave = '';
    while (clave.length < 4) {
      let aleatorio = Math.round(Math.random() * nombre.length);
      let random = Math.round(Math.random() * apellido.length);
      if (nombre > apellido) {
        clave += aleatorio;
      } else {
        clave += random;
      }
    }

    let pos = 0;
    if (nombre > apellido) {
      while (clave.length < 8) {
        let letra = nombre.charAt(parseInt(clave.charAt(pos)));
        if (letra != ' ') {
          clave += nombre.charAt(parseInt(clave.charAt(pos))).toUpperCase();
        } else {
          clave += 'X';
        }
        pos++;
      }
    } else {
      while (clave.length < 8) {
        let letra = apellido.charAt(parseInt(clave.charAt(pos))).toUpperCase();
        if (letra != ' ') {
          clave += apellido.charAt(parseInt(clave.charAt(pos))).toUpperCase();
        } else {
          clave += 'X';
        }
        pos++;
      }
    }
    return clave;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  resetForm() {
    this.profesor.clave_profesor = '';
    this.profesor.nombre = '';
    this.profesor.apellido = '';
    this.profesor.password = '';
    this.confirm_password = '';
  }
}
