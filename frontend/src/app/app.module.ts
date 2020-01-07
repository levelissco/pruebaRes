import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, 
        MatMenuModule, 
        MatCardModule, 
        MatTableModule, 
        MatIconModule, 
        MatCheckboxModule, 
        MatSidenavModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select'; 
import { MatSortModule } from '@angular/material/sort'; 
import { ScrollingModule } from '@angular/cdk/scrolling'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { CreateGrupoComponent } from './components/create-grupo/create-grupo.component';
import { GetGruposComponent } from './components/get-grupos/get-grupos.component';
import { EditGrupoComponent } from './components/edit-grupo/edit-grupo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { LoginProfesorComponent } from './components/login-profesor/login-profesor.component';
import { SignupProfesorComponent } from './components/signup-profesor/signup-profesor.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewListaComponent } from './components/view-lista/view-lista.component';

import { GruposService } from './services/grupo/grupos.service';
import { MateriaService } from './services/materia/materia.service';
import { AddEstudianteComponent } from './components/add-estudiante/add-estudiante.component';
import { AddEstudiantesComponent } from './components/add-estudiantes/add-estudiantes.component';
import { ListaComponent } from './components/lista/lista.component';
import { AddCriterioComponent } from './components/add-criterio/add-criterio.component';
import { ViewCriteriosComponent } from './components/view-criterios/view-criterios.component';
import { AddActividadComponent } from './components/add-actividad/add-actividad.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { DownloadPdfComponent } from './components/download-pdf/download-pdf.component';
import { DownloadXlsxComponent } from './components/download-xlsx/download-xlsx.component';
import { ListaAsistenciaComponent } from './components/lista-asistencia/lista-asistencia.component';
@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    CreateGrupoComponent,
    GetGruposComponent,
    EditGrupoComponent,
    InicioComponent,
    EncabezadoComponent,
    LoginEstudianteComponent,
    LoginProfesorComponent,
    SignupProfesorComponent,
    PerfilComponent,
    DashboardComponent,
    ViewListaComponent,
    AddEstudianteComponent,
    AddEstudiantesComponent,
    ListaComponent,
    AddCriterioComponent,
    ViewCriteriosComponent,
    AddActividadComponent,
    DialogConfirmComponent,
    GraficasComponent,
    DownloadPdfComponent,
    DownloadXlsxComponent,
    ListaAsistenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ScrollingModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    ChartsModule
  ],
  entryComponents:[
    EditGrupoComponent,
    ViewListaComponent,
    SignupProfesorComponent,
    AddActividadComponent,
    DialogConfirmComponent
  ]
  ,
  providers: [
    GruposService,
    MateriaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
