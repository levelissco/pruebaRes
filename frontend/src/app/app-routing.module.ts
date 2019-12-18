import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetGruposComponent } from './components/get-grupos/get-grupos.component'
import { CreateGrupoComponent } from './components/create-grupo/create-grupo.component'
import { EditGrupoComponent } from './components/edit-grupo/edit-grupo.component'
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { LoginProfesorComponent } from './components/login-profesor/login-profesor.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'login/teacher',
    component: LoginProfesorComponent
  },
  {
    path: 'login/student',
    component: LoginEstudianteComponent
  },
  {
    path: 'grupos',
    component: GetGruposComponent
  },
  {
    path: 'grupo/add',
    component: CreateGrupoComponent
  },
  {
    path: 'grupo/:grupo',
    component: EditGrupoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
