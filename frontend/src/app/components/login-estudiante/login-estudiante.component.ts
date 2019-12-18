import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioEstudiante } from 'src/app/models/usuariosEstudiante';
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

  
  constructor() { }

  ngOnInit() {
  }
  loginEstudiante(){
    console.log(this.numero_control, this.password);
    this.resetForm();
  }
  resetForm(){
    this.numero_control=null;
    this.password='';
  }
}
