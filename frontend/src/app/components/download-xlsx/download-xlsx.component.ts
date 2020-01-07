import { Component, OnInit } from '@angular/core';
import { XlsxService } from 'src/app/services/archivos/xlsx.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { Profesor } from 'src/app/models/profesor';
import { Materia } from 'src/app/models/materia';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-download-xlsx',
  templateUrl: './download-xlsx.component.html',
  styleUrls: ['./download-xlsx.component.css']
})
export class DownloadXlsxComponent implements OnInit {
  id_grupo: any;
  alumnos: any;
  data: any = [];
  profesor: Profesor;
  materia: Materia;
  clave_profesor: any;
  clave_materia: any;
  constructor(private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private profesorService: ProfesorService,
    private materiaService: MateriaService,
    private dataService: DataService,
    private xlsxService: XlsxService) {
  }

  ngOnInit() {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
    });
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getAlumnos();
      this.getProfesor();
    });
    this.storage.get('clave_materia').subscribe((materia) => {
      this.clave_materia = materia;
      this.getMateria();
    });
    this.dataService.listar$.subscribe( lista =>{
      this.getAlumnos();
    });
  }
  getProfesor(){
    this.profesorService.findProfesor(this.clave_profesor).subscribe(
      res => {
        this.profesor = res[0];
      },
      err => {
        console.log();
      }
    );
  }
  getMateria(){
    this.materiaService.getMateria(this.clave_materia).subscribe(
      res => {
        this.materia = res[0];
      },
      err => {
        console.log();
      }
    );
  }
  getAlumnos() {
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
      },
      err => console.log(err)
    );
  }

  downloadXLSX() {
    this.fillData();
    this.xlsxService.exportAsExcelFile(this.data, 'lista');
  }
  private fillData() {
    let cont = 0;
    this.alumnos.forEach(element => {
      this.data[cont] = { "Nº": cont + 1, "Num control": element.num_control, "Nombre": element.nombre_est }
      cont++
    });
  }
}
