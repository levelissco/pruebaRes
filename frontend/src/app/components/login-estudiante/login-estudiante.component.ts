import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AES, enc } from 'crypto-js';
@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css']
})
export class LoginEstudianteComponent implements OnInit {
  numero_control: number;
  password: string;
  passFormControl = new FormControl('', [Validators.required]);
  hide:boolean=true;

   
  constructor(private storage: StorageMap, private router: Router,
    public dialogRef: MatDialogRef<LoginEstudianteComponent>,
    private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  loginEstudiante(){
    this.estudianteService.findEstudiante(this.numero_control).subscribe(
      res =>{
        const estudiante = res[0];
        if (estudiante !== undefined) {
          let decryptedData = AES.decrypt(estudiante.password_est, 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=').toString(enc.Utf8);
          if (this.password == decryptedData) {
            this.dialogRef.close();
            console.log('logueado');
            //this.storage.set('numero_control', this.numero_control).subscribe( () => {});
  
            // this.router.navigate(['/grupos/add'])
          }else{
            this.openSnackBar('Contraseña incorrecta');
            this.resetPassword();
          }
        }else{
          this.openSnackBar('Usuario Invalido');
        }
      },
      err =>{
        console.log(err);
      }
    );
  }
  resetForm(){
    this.numero_control=null;
    this.password='';
  }
  resetPassword(){
    this.password='';
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
