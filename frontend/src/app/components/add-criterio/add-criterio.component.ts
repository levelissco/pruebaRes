import { Component, OnInit } from '@angular/core';
import { Criterio } from 'src/app/models/criterio';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataService } from 'src/app/services/data/data.service';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';
import { GruposService } from 'src/app/services/grupo/grupos.service';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';

@Component({
  selector: 'app-add-criterio',
  templateUrl: './add-criterio.component.html',
  styleUrls: ['./add-criterio.component.css']
})
export class AddCriterioComponent implements OnInit {
  id_grupo: any;
  clave_profesor: any;
  unidad: number = 1;
  criterio: Criterio = {
    numero: null,
    unidad: null,
    nombre: '',
    porcentaje: null,
    id_grupo: this.id_grupo
  };
  email: Correo;
  grupo: any;
  correos: any = [];
  constructor(private storage: StorageMap,
    private dataService: DataService,
    private criterioService: CriterioService,
    private emailService: EmailService,
    private grupoService: GruposService,
    private estudianteService: EstudianteService,
    private detalleGrupoService: DetalleGrupoService) {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getGrupo();
    });
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getCorreos();
    });
  }

  ngOnInit() {
    this.dataService.unidad$.subscribe(unidad => {
      this.unidad = unidad;
      this.resetForm();
    });
  }
  getGrupo() {
    this.grupoService.findGrupo(this.id_grupo).subscribe(
      res => {
        this.grupo = res[0];
      },
      err => {
        console.log(err);
      }
    );
  }
  saveCriterio() {
    this.criterio.unidad = this.unidad;
    this.criterio.id_grupo = this.id_grupo;
    this.criterioService.newCriterio(this.criterio).subscribe(
      res => {
        this.dataService.criterios$.emit();
        this.correos.forEach(element => {
          if (element.email_est != null) {
            this.email = {
              email: element.email_est,
              asunto: "Nuevo criterio",
              mensaje: `Se ha agregado nuevo criterio a la unidad ${this.unidad} de la materia ${this.grupo.nombre_materia} del grupo ${this.grupo.clave_grupo}`
            }
            this.emailService.sendEmail(this.email).subscribe(
              res => {
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  getCorreos() {
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, "0").subscribe(
      res => {
        this.correos = res;
      },
      err => {
        console.log();
      }
    );
  }
  resetForm() {
    this.criterio = {
      unidad: this.unidad,
      nombre: '',
      porcentaje: null
    }
  }
}
