import { Time } from '@angular/common';

export interface Grupo {
    clave_materia: string;
    clave_grupo: string;
    clave_profesor: number;
    hora_inicio?: string;
    hora_final?: string;
}