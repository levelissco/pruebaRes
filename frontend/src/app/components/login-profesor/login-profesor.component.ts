import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AES, enc } from 'crypto-js';
import { SignupProfesorComponent } from '../signup-profesor/signup-profesor.component';

@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {
  passFormControl = new FormControl('', [Validators.required]);
  hide:boolean=true;
  clave_profesor: string;
  password:string;
  constructor(private storage: StorageMap, private router: Router,
    public dialogRef: MatDialogRef<LoginProfesorComponent>,
    private profesorService: ProfesorService,
    private _snackBar: MatSnackBar, private dialog: MatDialog) { 
  }

  ngOnInit() {
  }
  loginProfesor(){
    this.profesorService.findProfesor(this.clave_profesor).subscribe(
      res => {
        const profesor = res[0];
        if (profesor !== undefined) {
          let decryptedData = AES.decrypt(profesor.password, 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=').toString(enc.Utf8);
          if (decryptedData == this.password) {
            this.dialogRef.close();
            this.storage.set('clave_profesor', this.clave_profesor).subscribe( () => {});
            this.router.navigate(['/dashboard'])
          }else{
            this.openSnackBar('Contraseña incorrecta');
          }
        }else{
          this.openSnackBar('Usuario Invalido');
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  signUp(){
    const dialogRef = this.dialog.open(SignupProfesorComponent, {
      height: '500px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
