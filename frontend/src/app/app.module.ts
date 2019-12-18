import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatMenuModule, MatCardModule, MatTableModule, MatIconModule, MatCheckboxModule } from '@angular/material';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { CreateGrupoComponent } from './components/create-grupo/create-grupo.component';
import { GetGruposComponent } from './components/get-grupos/get-grupos.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditGrupoComponent } from './components/edit-grupo/edit-grupo.component';

import { GruposService } from './services/grupo/grupos.service';
import { MateriaService } from './services/materia/materia.service';
import { InicioComponent } from './components/inicio/inicio.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { LoginProfesorComponent } from './components/login-profesor/login-profesor.component'
@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    CreateGrupoComponent,
    GetGruposComponent,
    FooterComponent,
    EditGrupoComponent,
    InicioComponent,
    EncabezadoComponent,
    LoginEstudianteComponent,
    LoginProfesorComponent
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
    MatCheckboxModule
  ],
  entryComponents:[
    EditGrupoComponent
  ]
  ,
  providers: [
    GruposService,
    MateriaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
