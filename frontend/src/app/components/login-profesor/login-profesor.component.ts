import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {
  passFormControl = new FormControl('', [Validators.required]);
  hide:boolean=true;
  clave_profesor:number;
  password:string;
  constructor(private storage: StorageMap, private router: Router,
    public dialogRef: MatDialogRef<LoginProfesorComponent>) { 
    this.storage.set('clave_profesor', this.clave_profesor).subscribe( () => {});
  }

  ngOnInit() {
  }
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'Ingresa tu correo' :
  //       this.email.hasError('email') ? 'Correo invalido' :
  //           '';
  // }
  loginProfesor(){
    console.log(this.clave_profesor, this.password);
    this.router.navigate(['/grupos'])
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
