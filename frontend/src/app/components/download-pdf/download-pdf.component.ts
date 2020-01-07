import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/archivos/pdf.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { Profesor } from 'src/app/models/profesor';
import { Materia } from 'src/app/models/materia';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css']
})
export class DownloadPdfComponent implements OnInit {
  id_grupo: any;
  alumnos: any;
  data: any = [];
  profesor: Profesor;
  materia: Materia;
  clave_profesor: any;
  clave_materia: any;
  constructor(private pdf: PdfService, private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private profesorService: ProfesorService,
    private materiaService: MateriaService,
    private dataService: DataService) {
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
  downloadPDF() {
    this.fillData();
    let columns = [
      { title: "Nº", dataKey: "id" },
      { title: "Nº de control", dataKey: "control" },
      { title: "Nombre", dataKey: "name" }
    ];
    this.pdf.init();
    this.setHeader();
    this.setFormulario();
    this.fillFormulario();
    this.pdf.createTable(columns, this.data);
    this.pdf.createDocument('lista');
  }
  setFormulario() {
    this.pdf.setFonts('bold', 11);
    this.pdf.addText(15, 50, 'NOM. DE PROFESOR: ');
    this.pdf.addText(15, 55, 'CLV. DE MATERIA: ');
    this.pdf.addText(15, 60, 'NOM. DE MATERIA: ');
    this.pdf.addText(15, 65, 'GRUPO: ');
    this.pdf.addText(100, 65, 'NUMERO DE UNIDAD: ');
  }
  fillFormulario(){
    this.pdf.setFontType('normal');
    this.pdf.addText(57, 50, this.profesor.apellido+' '+this.profesor.nombre);
    this.pdf.addText(55, 55, this.materia.clave_materia);
    this.pdf.addText(55, 60, this.materia.nombre_materia);
    this.pdf.addText(40, 65, 'pend');
    this.pdf.addText(150, 65, 'pend');
  }
  setHeader() {
    let img_url = 'assets/encabezado/tecnm.png'
    this.pdf.addImagen(img_url, 'png', 15, 10, 30, 20);
    img_url = 'assets/encabezado/ito.png';
    this.pdf.addImagen(img_url, 'png', 175, 10, 15, 20);
    this.pdf.setFontType('bold');
    this.pdf.addText(56, 15, 'TECNOLÓGICO NACIONAL DE MÉXICO');
    this.pdf.addText(55, 25, 'INSTITUTO TECNOLÓGICO DE OAXACA');
    this.pdf.addText(54, 35, 'ING. EN SISTEMAS COMPUTACIONALES');
  }
  fillData() {
    let cont = 0;
    this.alumnos.forEach(element => {
      this.data[cont] = { "id": cont + 1, "control": element.num_control, "name": element.nombre_est }
      cont++
    });
  }

}
