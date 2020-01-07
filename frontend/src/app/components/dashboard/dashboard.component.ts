import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Time } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apellido: string;
  clave_profesor: any;
  hora: number;
  constructor(private profesorService: ProfesorService,
    private storage: StorageMap) {
  }

  ngOnInit() {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      let date = new Date();
      this.hora = date.getHours();
      this.clave_profesor = profesor;
      this.profesorService.findProfesor(this.clave_profesor).subscribe(
        res =>{
          this.apellido = res[0].apellido;
        },
        err =>{
          console.log(err);
        }
      );
    });
  }

}
